node-red-contrib-simple-message-queue
================================

A simple queue node that store incoming messages in memory queue and
uses a feedback from a following action to release the next message.

![simple-message-queue](https://github.com/shady2k/node-red-contrib-simple-message-queue/raw/master/simple-message-queue.png "Demo flow")

**Inputs**

**trigger**: If a message is received with this property, one message from queue will be released.

**reset**: If a message is received with this property, queue will be cleared.

**ttl**: If a message is received with this property, message added to the queue will live in the queue for specific value in milliseconds. The value of the TTL must be a non-negative integer (0 <= n), describing the TTL period in milliseconds. Thus a value of 1000 means that a message added to the queue will live in the queue for 1 second or until it is delivered.

**Config**

**Bypass first message?**: If this flag set to True, first message only will be bypassed. Message with Reset property will resume this behaviour. False by default.

**Bypass interval**: If this value greater than 0, node will wait for specific interval in milliseconds and if only one message in queue, message will be released.

This node is based on https://gist.github.com/dceejay/cea8afa28b7a93ebdc0f - respect to @dceejay (Dave Conway-Jones) https://github.com/dceejay

Here's a demo flow:
`[{"id":"fe09fb63.f859e8","type":"inject","z":"e089622.6a906a","name":"","topic":"","payload":"test","payloadType":"str","repeat":"","crontab":"","once":false,"x":250,"y":160,"wires":[["73e84f44.05735"]]},{"id":"cdb38d47.cd149","type":"debug","z":"e089622.6a906a","name":"","active":true,"console":"false","complete":"true","x":870,"y":160,"wires":[]},{"id":"4b9c998a.373cc8","type":"inject","z":"e089622.6a906a","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":240,"y":260,"wires":[["eda764e1.8074b8"]]},{"id":"eda764e1.8074b8","type":"change","z":"e089622.6a906a","name":"","rules":[{"t":"set","p":"trigger","pt":"msg","to":"1","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":440,"y":260,"wires":[["73e84f44.05735"]]},{"id":"c5d04e3b.efe1f","type":"inject","z":"e089622.6a906a","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":240,"y":320,"wires":[["4f231841.69dd78"]]},{"id":"4f231841.69dd78","type":"change","z":"e089622.6a906a","name":"Bypass set to true","rules":[{"t":"set","p":"bypass","pt":"msg","to":"true","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":430,"y":320,"wires":[["73e84f44.05735"]]},{"id":"49783823.727dd8","type":"inject","z":"e089622.6a906a","name":"","topic":"","payload":"test","payloadType":"str","repeat":"","crontab":"","once":false,"x":250,"y":120,"wires":[["b6103616.738bb8"]]},{"id":"b6103616.738bb8","type":"change","z":"e089622.6a906a","name":"","rules":[{"t":"set","p":"ttl","pt":"msg","to":"2000","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":430,"y":120,"wires":[["73e84f44.05735"]]},{"id":"61c94eb4.f285e","type":"inject","z":"e089622.6a906a","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":240,"y":360,"wires":[["f80b3fd.988a6c"]]},{"id":"f80b3fd.988a6c","type":"change","z":"e089622.6a906a","name":"Bypass set to false","rules":[{"t":"set","p":"bypass","pt":"msg","to":"false","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":430,"y":360,"wires":[["73e84f44.05735"]]},{"id":"86543cdf.3706c","type":"inject","z":"e089622.6a906a","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":240,"y":220,"wires":[["6d3ba29e.ea192c"]]},{"id":"6d3ba29e.ea192c","type":"change","z":"e089622.6a906a","name":"","rules":[{"t":"set","p":"reset","pt":"msg","to":"1","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":440,"y":220,"wires":[["73e84f44.05735"]]},{"id":"73e84f44.05735","type":"simple-queue","z":"e089622.6a906a","name":"queue1","firstMessageBypass":false,"bypassInterval":"0","x":680,"y":160,"wires":[["cdb38d47.cd149"]]}]`