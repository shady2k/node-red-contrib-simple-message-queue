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
	
	var EventEmitter = require('events').EventEmitter;
	
	function simpleQueueNode(config) {

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
			    if (context.queue.length > 0) {
			        context.queue = [];
			        return;
			    }
			}

			// if the msg is a trigger one release next message
			if (msg.hasOwnProperty("trigger")) {
			    if (context.queue.length > 0) {
			        var m = context.queue.shift();
			        if((now() - m._queuetimestamp) < m.ttl) {
			            node.send(m);
			        }
			    }
			} else {
		        // Add to queue
		        msg._queuetimestamp = now();
		        context.queue.push(msg);
			}

			node.status({fill:"green",shape:"ring",text: context.queue.length});
		});

		node.on("close", function() {
			//close
		});
	}

	RED.nodes.registerType("simpleQueue", simpleQueueNode);
	
};