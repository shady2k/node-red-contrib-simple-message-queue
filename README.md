node-red-contrib-simple-message-queue
================================

A simple queue node that store incoming messages in memory queue and
uses a feedback from a following action to release the next message.

Inputs

trigger: If a message is received with this property, one message from queue will be released.

reset: If a message is received with this property, queue will be cleared.
ttl: If a message is received with this property, message added to the queue will live in the queue for specific value in milliseconds. The value of the TTL must be a non-negative integer (0 <= n), describing the TTL period in milliseconds. Thus a value of 1000 means that a message added to the queue will live in the queue for 1 second or until it is delivered.

This node is based on https://gist.github.com/dceejay/cea8afa28b7a93ebdc0f - respect to dceejay (Dave Conway-Jones) https://github.com/dceejay
