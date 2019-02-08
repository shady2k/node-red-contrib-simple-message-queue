node-red-contrib-simple-message-queue
================================

A simple queue node that store incoming messages in memory queue and uses a feedback from a following action or trigger message to release the next message stored in the queue.

![simple-message-queue](https://github.com/shady2k/node-red-contrib-simple-message-queue/raw/master/simple-message-queue.png "Demo flow")

# Inputs
**trigger**: If a message is received with this property, one message from the queue will be released. The outbound message will have a _queueCount property with number of messages left in the queue. _queueCount will not include the message triggered. For example, if the message triggered is the last one in the queue, _queueCount will be 0 (zero).

**reset**: If a message is received with the reset property, all messages in the queue will be cleared. In addition, the node will not forward the incoming reset message for processing by any subsequent nodes in the sequence.

**ttl**: If a message is received with this property, a message will be added to the queue and will live in the queue for specific value in milliseconds. The value of the TTL must be a non-negative integer (0 <= n), describing the TTL period in milliseconds. Thus a value of 1000 means that a message added to the queue will live in the queue for 1 second. If message with TTL property has not been released for specified time, it will be deleted from queue without any output.

**queueCount**: If a message is received with this property, node will send message with number of messages left in the queue in _queueCount property. This message won't store in queue.

**bypass**: If a message is received with this property, and it set to true, bypass mode will turned on and all new incoming messages will be bypassed to output with _queueCount property, messaged in queue will not be cleared. If bypass property set to false, bypass mode will turned off and node return to normal operational, queue will not be cleared. Message with bypass property won't store in queue and trigger any messages.

## Input hierarchy
The following illustrates how the node will respond if more than one of the properties listed above is included in an incoming message.
1. **reset** -- the highest priority. if a message has a reset property, all other properties will be ignored.
2. **queueCount** -- will override trigger and bypass. The resulting outbound message will include the _queueCount property and the queueCount property will be removed. Any other properties on the incoming message will be ignored.
3. **bypass** -- higher priority than trigger. Message with bypass property won't store in queue and trigger any messages.
4. **trigger** -- one message from queue will be released as a result of a trigger message, it will include a _queueCount property. Message with trigger property won't store in queue.

# Config
**Bypass first message?**: If this flag set to True, first new message will be bypassed, than node will be busy until it's not get message with trigger property. True by default.

**Bypass interval**: If this value greater than 0, node will realease message from queue without trigger after specific interval in milliseconds since last message send.

This node is based on https://gist.github.com/dceejay/cea8afa28b7a93ebdc0f - respect to @dceejay (Dave Conway-Jones) https://github.com/dceejay

# Example
Here's a demo flow:
`[{"id":"4700a8d4.4d63e8","type":"inject","z":"a683743d.5d47b8","name":"","topic":"","payload":"test","payloadType":"str","repeat":"","crontab":"","once":false,"x":150,"y":120,"wires":[["b077f134.ebd26"]]},{"id":"67146b82.741ad4","type":"debug","z":"a683743d.5d47b8","name":"","active":true,"console":"false","complete":"true","x":770,"y":120,"wires":[]},{"id":"567ba66d.c785d8","type":"inject","z":"a683743d.5d47b8","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":140,"y":220,"wires":[["9a140d15.9fa13"]]},{"id":"9a140d15.9fa13","type":"change","z":"a683743d.5d47b8","name":"","rules":[{"t":"set","p":"trigger","pt":"msg","to":"1","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":340,"y":220,"wires":[["b077f134.ebd26"]]},{"id":"dd536729.bf3d58","type":"inject","z":"a683743d.5d47b8","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":140,"y":280,"wires":[["34d52a21.61b856"]]},{"id":"34d52a21.61b856","type":"change","z":"a683743d.5d47b8","name":"Bypass set to true","rules":[{"t":"set","p":"bypass","pt":"msg","to":"true","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":330,"y":280,"wires":[["b077f134.ebd26"]]},{"id":"61a8c034.56dca","type":"inject","z":"a683743d.5d47b8","name":"","topic":"","payload":"test","payloadType":"str","repeat":"","crontab":"","once":false,"x":150,"y":80,"wires":[["919091c0.c3272"]]},{"id":"919091c0.c3272","type":"change","z":"a683743d.5d47b8","name":"","rules":[{"t":"set","p":"ttl","pt":"msg","to":"2000","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":330,"y":80,"wires":[["b077f134.ebd26"]]},{"id":"17626632.696eda","type":"inject","z":"a683743d.5d47b8","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":140,"y":320,"wires":[["1a7a88ac.dc27a7"]]},{"id":"1a7a88ac.dc27a7","type":"change","z":"a683743d.5d47b8","name":"Bypass set to false","rules":[{"t":"set","p":"bypass","pt":"msg","to":"false","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":330,"y":320,"wires":[["b077f134.ebd26"]]},{"id":"f0f7b79c.5f8388","type":"inject","z":"a683743d.5d47b8","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":140,"y":180,"wires":[["4515a31a.69750c"]]},{"id":"4515a31a.69750c","type":"change","z":"a683743d.5d47b8","name":"","rules":[{"t":"set","p":"reset","pt":"msg","to":"1","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":340,"y":180,"wires":[["b077f134.ebd26"]]},{"id":"b077f134.ebd26","type":"simple-queue","z":"a683743d.5d47b8","name":"queue1","firstMessageBypass":true,"bypassInterval":"0","x":580,"y":120,"wires":[["67146b82.741ad4"]]}]`
