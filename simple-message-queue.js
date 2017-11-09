/*
  A simpe messages queue for IBM's Node-Red
  https://github.com/shady2k/node-red-contrib-simple-message-queue
  (c) 2017, shady2k <shady2k@gmail.com>
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

module.exports = function(RED) {
	
	function isNormalInteger(str) {
	    return /^\+?(0|[1-9]\d*)$/.test(str);
	}

	function simpleMessageQueueNode(config) {

		RED.nodes.createNode(this, config);
		this.name = config.name;
		var node = this;
		
		// Yes it's true: an incoming message just happened
		node.on("input", function(msg) {
			var now = Date.now;
			var context = node.context();

			// if queue doesn't exist, create it
			context.queue = context.queue || [];

			// if the msg is a reset, clear queue
			if (msg.hasOwnProperty("reset")) {
		        context.queue = [];
			} else if (msg.hasOwnProperty("trigger")) {   // if the msg is a trigger one release next message
		        // Filter overdue messages
				context.queue = context.queue.filter(function(x) {
					return ((now() - x._queuetimestamp) < x.ttl || x.ttl == 0);
				});
			    if(context.queue.length > 0) {
			        var m = context.queue.shift();
		            node.send(m);
			    }
			} else {
		        // Check if ttl value of new message is positive integer
		        var ttl = msg.ttl || 0;
		        if(!isNormalInteger(ttl)) ttl = 0;

		        msg.ttl = ttl;
		        msg._queuetimestamp = now();
		        context.queue.push(msg); // Add to queue

		        // Filter overdue messages
				context.queue = context.queue.filter( function(x) {
					return ((now() - x._queuetimestamp) < x.ttl || x.ttl == 0);
				});
			}
			// Update status
			node.status({fill:"green",shape:"ring",text: context.queue.length});
		});

		node.on("close", function() {
			// Update status
			node.status({fill:"green",shape:"ring",text: 0});
		});
	}

	RED.nodes.registerType("simple-queue", simpleMessageQueueNode);
};