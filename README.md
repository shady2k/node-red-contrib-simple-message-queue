node-red-contrib-simple-message-queue
================================

A simple queue node that store incoming messages in memory queue and uses a feedback from a following action or trigger message to release the next message stored in the queue.

![simple-message-queue](https://github.com/shady2k/node-red-contrib-simple-message-queue/raw/master/simple-message-queue.png "Demo flow")

**Inputs**

**trigger**: If a message is received with this property, one message from queue will be released. Every message have queueCount property with number of messages left in the queue at the moment.

**reset**: If a message is received with this property, queue will be cleared.

**ttl**: If a message is received with this property, message added to the queue will live in the queue for specific value in milliseconds. The value of the TTL must be a non-negative integer (0 <= n), describing the TTL period in milliseconds. Thus a value of 1000 means that a message added to the queue will live in the queue for 1 second or until it is delivered.

**queueCount**: If a message is received with this property, node will send message with number of messages left in the queue in _queueCount property. This message won't store in queue.

**Config**

**Bypass first message?**: If this flag set to True, first new message will be bypassed, than node will be busy until it's not get message with trigger property. True by default.

**Bypass interval**: If this value greater than 0, node will realease message from queue without trigger after specific interval in milliseconds since last message send.

This node is based on https://gist.github.com/dceejay/cea8afa28b7a93ebdc0f - respect to @dceejay (Dave Conway-Jones) https://github.com/dceejay

Here's a demo flow:
`[{"id":"4700a8d4.4d63e8","type":"inject","z":"a683743d.5d47b8","name":"","topic":"","payload":"test","payloadType":"str","repeat":"","crontab":"","once":false,"x":150,"y":120,"wires":[["b077f134.ebd26"]]},{"id":"67146b82.741ad4","type":"debug","z":"a683743d.5d47b8","name":"","active":true,"console":"false","complete":"true","x":770,"y":120,"wires":[]},{"id":"567ba66d.c785d8","type":"inject","z":"a683743d.5d47b8","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":140,"y":220,"wires":[["9a140d15.9fa13"]]},{"id":"9a140d15.9fa13","type":"change","z":"a683743d.5d47b8","name":"","rules":[{"t":"set","p":"trigger","pt":"msg","to":"1","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":340,"y":220,"wires":[["b077f134.ebd26"]]},{"id":"dd536729.bf3d58","type":"inject","z":"a683743d.5d47b8","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":140,"y":280,"wires":[["34d52a21.61b856"]]},{"id":"34d52a21.61b856","type":"change","z":"a683743d.5d47b8","name":"Bypass set to true","rules":[{"t":"set","p":"bypass","pt":"msg","to":"true","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":330,"y":280,"wires":[["b077f134.ebd26"]]},{"id":"61a8c034.56dca","type":"inject","z":"a683743d.5d47b8","name":"","topic":"","payload":"test","payloadType":"str","repeat":"","crontab":"","once":false,"x":150,"y":80,"wires":[["919091c0.c3272"]]},{"id":"919091c0.c3272","type":"change","z":"a683743d.5d47b8","name":"","rules":[{"t":"set","p":"ttl","pt":"msg","to":"2000","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":330,"y":80,"wires":[["b077f134.ebd26"]]},{"id":"17626632.696eda","type":"inject","z":"a683743d.5d47b8","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":140,"y":320,"wires":[["1a7a88ac.dc27a7"]]},{"id":"1a7a88ac.dc27a7","type":"change","z":"a683743d.5d47b8","name":"Bypass set to false","rules":[{"t":"set","p":"bypass","pt":"msg","to":"false","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":330,"y":320,"wires":[["b077f134.ebd26"]]},{"id":"f0f7b79c.5f8388","type":"inject","z":"a683743d.5d47b8","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":140,"y":180,"wires":[["4515a31a.69750c"]]},{"id":"4515a31a.69750c","type":"change","z":"a683743d.5d47b8","name":"","rules":[{"t":"set","p":"reset","pt":"msg","to":"1","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":340,"y":180,"wires":[["b077f134.ebd26"]]},{"id":"b077f134.ebd26","type":"simple-queue","z":"a683743d.5d47b8","name":"queue1","firstMessageBypass":true,"bypassInterval":"0","x":580,"y":120,"wires":[["67146b82.741ad4"]]}]`