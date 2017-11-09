node-red-contrib-simple-message-queue
================================

A simple queue node that store incoming messages in memory queue and
uses a feedback from a following action to release the next message.

![simple-message-queue](https://github.com/shady2k/node-red-contrib-simple-message-queue/raw/master/simple-message-queue.png "Demo flow")

**Inputs**

**trigger**: If a message is received with this property, one message from queue will be released.

**reset**: If a message is received with this property, queue will be cleared.

**ttl**: If a message is received with this property, message added to the queue will live in the queue for specific value in milliseconds. The value of the TTL must be a non-negative integer (0 <= n), describing the TTL period in milliseconds. Thus a value of 1000 means that a message added to the queue will live in the queue for 1 second or until it is delivered.

This node is based on https://gist.github.com/dceejay/cea8afa28b7a93ebdc0f - respect to @dceejay (Dave Conway-Jones) https://github.com/dceejay

Here's a demo flow:
`[{"id":"fe09fb63.f859e8","type":"inject","z":"e089622.6a906a","name":"","topic":"","payload":"test","payloadType":"str","repeat":"","crontab":"","once":false,"x":281,"y":179,"wires":[["4f212c8f.028784"]]},{"id":"cdb38d47.cd149","type":"debug","z":"e089622.6a906a","name":"","active":true,"console":"false","complete":"true","x":910,"y":178,"wires":[]},{"id":"4b9c998a.373cc8","type":"inject","z":"e089622.6a906a","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":232,"y":310,"wires":[["eda764e1.8074b8"]]},{"id":"eda764e1.8074b8","type":"change","z":"e089622.6a906a","name":"","rules":[{"t":"set","p":"trigger","pt":"msg","to":"1","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":455,"y":310,"wires":[["4f212c8f.028784"]]},{"id":"c5d04e3b.efe1f","type":"inject","z":"e089622.6a906a","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":217,"y":372,"wires":[["4f231841.69dd78"]]},{"id":"4f231841.69dd78","type":"change","z":"e089622.6a906a","name":"","rules":[{"t":"set","p":"reset","pt":"msg","to":"1","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":440,"y":372,"wires":[["4f212c8f.028784"]]},{"id":"49783823.727dd8","type":"inject","z":"e089622.6a906a","name":"","topic":"","payload":"test","payloadType":"str","repeat":"","crontab":"","once":false,"x":287,"y":100,"wires":[["b6103616.738bb8"]]},{"id":"b6103616.738bb8","type":"change","z":"e089622.6a906a","name":"","rules":[{"t":"set","p":"ttl","pt":"msg","to":"2000","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":442,"y":103,"wires":[["4f212c8f.028784"]]},{"id":"4f212c8f.028784","type":"simple-queue","z":"e089622.6a906a","name":"queue1","x":664,"y":176,"wires":[["cdb38d47.cd149"]]}]`