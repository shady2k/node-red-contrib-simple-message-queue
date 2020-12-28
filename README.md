node-red-contrib-simple-message-queue
================================

[![NPM version](http://img.shields.io/npm/v/node-red-contrib-simple-message-queue.svg)](https://www.npmjs.com/package/node-red-contrib-simple-message-queue)
[![Downloads](https://img.shields.io/npm/dm/node-red-contrib-simple-message-queue.svg)](https://www.npmjs.com/package/node-red-contrib-simple-message-queue)

[![NPM](https://nodei.co/npm/node-red-contrib-simple-message-queue.png?downloads=true)](https://nodei.co/npm/node-red-contrib-simple-message-queue/)

A simple queue node that store incoming messages in memory queue and uses a feedback from a following action or trigger message to release the next message stored in the queue.

![simple-message-queue](https://github.com/shady2k/node-red-contrib-simple-message-queue/raw/master/simple-message-queue.png "Demo flow")

# Inputs
**trigger**: If a message is received with this property, one message from the queue will be released. The outbound message will have a _queueCount property with number of messages left in the queue. _queueCount will not include the message triggered. For example, if the message triggered is the last one in the queue, _queueCount will be 0 (zero).

**reset**: If a message is received with the reset property, all messages in the queue will be cleared. In addition, the node will not forward the incoming reset message for processing by any subsequent nodes in the sequence.

**ttl**: If a message is received with this property, a message will be added to the queue and will live in the queue for specific value in milliseconds. The value of the TTL must be a non-negative integer (0 <= n), describing the TTL period in milliseconds. Thus a value of 1000 means that a message added to the queue will live in the queue for 1 second. If message with TTL property has not been released for specified time, it will be deleted from queue without any output.

**queueCount**: If a message is received with this property, node will send message with number of messages left in the queue in _queueCount property. This message won't store in queue.

**bypass**: If a message is received with this property, and it set to true, bypass mode will turned on and all new incoming messages will be bypassed to output with _queueCount property, messaged in queue will not be cleared. If bypass property set to false, bypass mode will turned off and node return to normal operational, queue will not be cleared. Message with bypass property won't store in queue and trigger any messages.

**bypassInterval**: Message with this property allow to dynamically change bypass interval in milliseconds from config, 0 - no bypass.

## Input hierarchy
The following illustrates how the node will respond if more than one of the properties listed above is included in an incoming message.
1. **reset** -- the highest priority. if a message has a reset property, all other properties will be ignored.
2. **queueCount** -- will override trigger and bypass. The resulting outbound message will include the _queueCount property and the queueCount property will be removed. Any other properties on the incoming message will be ignored.
3. **bypassInterval** -- higher priority than queueCount. Message with this property won't store in queue and trigger any messages.
4. **bypass** -- higher priority than trigger. Message with bypass property won't store in queue and trigger any messages.
5. **trigger** -- one message from queue will be released as a result of a trigger message, it will include a _queueCount property. Message with trigger property won't store in queue.

# Config
**Bypass first message?**: If this flag set to True, first new message will be bypassed, than node will be busy until it's not get message with trigger property. True by default.

**Bypass interval**: If this value greater than 0, node will realease message from queue without trigger after specific interval in milliseconds since last message send.

This node is based on https://gist.github.com/dceejay/cea8afa28b7a93ebdc0f - respect to @dceejay (Dave Conway-Jones) https://github.com/dceejay

# Example
Here's a demo flow:
`[{"id":"e089622.6a906a","type":"tab","label":"Flow 1"},{"id":"fe09fb63.f859e8","type":"inject","z":"e089622.6a906a","name":"","topic":"","payload":"test","payloadType":"str","repeat":"","crontab":"","once":false,"x":250,"y":160,"wires":[["6c1851d1.8b28f"]]},{"id":"cdb38d47.cd149","type":"debug","z":"e089622.6a906a","name":"","active":true,"console":"false","complete":"true","x":870,"y":160,"wires":[]},{"id":"4b9c998a.373cc8","type":"inject","z":"e089622.6a906a","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":240,"y":260,"wires":[["eda764e1.8074b8"]]},{"id":"eda764e1.8074b8","type":"change","z":"e089622.6a906a","name":"","rules":[{"t":"set","p":"trigger","pt":"msg","to":"1","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":440,"y":260,"wires":[["6c1851d1.8b28f"]]},{"id":"c5d04e3b.efe1f","type":"inject","z":"e089622.6a906a","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":240,"y":320,"wires":[["4f231841.69dd78"]]},{"id":"4f231841.69dd78","type":"change","z":"e089622.6a906a","name":"Bypass set to true","rules":[{"t":"set","p":"bypass","pt":"msg","to":"true","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":430,"y":320,"wires":[["6c1851d1.8b28f"]]},{"id":"49783823.727dd8","type":"inject","z":"e089622.6a906a","name":"","topic":"","payload":"test","payloadType":"str","repeat":"","crontab":"","once":false,"x":250,"y":120,"wires":[["b6103616.738bb8"]]},{"id":"b6103616.738bb8","type":"change","z":"e089622.6a906a","name":"","rules":[{"t":"set","p":"ttl","pt":"msg","to":"2000","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":430,"y":120,"wires":[["6c1851d1.8b28f"]]},{"id":"61c94eb4.f285e","type":"inject","z":"e089622.6a906a","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":240,"y":360,"wires":[["f80b3fd.988a6c"]]},{"id":"f80b3fd.988a6c","type":"change","z":"e089622.6a906a","name":"Bypass set to false","rules":[{"t":"set","p":"bypass","pt":"msg","to":"false","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":430,"y":360,"wires":[["6c1851d1.8b28f"]]},{"id":"86543cdf.3706c","type":"inject","z":"e089622.6a906a","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":240,"y":220,"wires":[["6d3ba29e.ea192c"]]},{"id":"6d3ba29e.ea192c","type":"change","z":"e089622.6a906a","name":"","rules":[{"t":"set","p":"reset","pt":"msg","to":"1","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":440,"y":220,"wires":[["6c1851d1.8b28f"]]},{"id":"5190f4e7.cabbbc","type":"inject","z":"e089622.6a906a","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":240,"y":80,"wires":[["61d34c47.cdfc94"]]},{"id":"61d34c47.cdfc94","type":"change","z":"e089622.6a906a","name":"","rules":[{"t":"set","p":"queueCount","pt":"msg","to":"","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":460,"y":80,"wires":[["6c1851d1.8b28f"]]},{"id":"6c1851d1.8b28f","type":"simple-queue","z":"e089622.6a906a","name":"","firstMessageBypass":false,"bypassInterval":"0","x":690,"y":160,"wires":[["cdb38d47.cd149"]]}]`
