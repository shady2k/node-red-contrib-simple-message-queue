node-red-contrib-simple-queue
================================

A simple queue node that store incoming messages in memory queue and
uses a feedback from a following action to release the next message.

Inputs

trigger: If a message is received with this property, one message from queue will be released.
reset: If a message is received with this property, queue will be cleared.

This node is based on https://gist.github.com/dceejay/cea8afa28b7a93ebdc0f - respect to dceejay (Dave Conway-Jones) https://github.com/dceejay
