# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Node-RED custom node package (`node-red-contrib-simple-message-queue`) that implements an in-memory message queue with trigger-based release mechanism. The queue allows messages to be stored and released based on feedback signals, with support for TTL (time-to-live), bypass modes, and automatic interval-based release.

## Architecture

This is a simple two-file Node-RED custom node implementation:

- **simple-message-queue.js**: Backend node logic (registered with Node-RED runtime)
- **simple-message-queue.html**: Frontend UI definition (Node-RED editor interface)
- **icons/**: SVG icon for the node

### Node Registration

The node is registered as `simple-queue` type in the `storage` category via:
- Backend: `RED.nodes.registerType("simple-queue", SimpleMessageQueueNode)`
- Frontend: `RED.nodes.registerType('simple-queue', {...})`

## Core Functionality

### Message Processing Hierarchy

The node processes incoming messages based on a strict priority hierarchy (implemented in simple-message-queue.js:74-142):

1. **reset** (highest priority) - Clears entire queue
2. **queueCount** - Returns current queue length without queueing the message
3. **bypassInterval** - Dynamically updates bypass interval configuration
4. **bypass** - Toggles bypass mode (true/false)
5. **trigger** - Releases one message from queue
6. **Normal message** - Queued or bypassed based on current state

### State Management

The node maintains state in Node-RED's context storage:
- `context.queue[]` - Array of queued messages
- `context.is_disabled` - Bypass mode flag
- `smq.isBusy` - Tracks if node is actively processing
- `smq.bypassTimer` - Timer reference for interval-based bypass

### Queue Behavior

- **First Message Bypass**: Configurable (default: true). First message passes through immediately without queueing
- **Bypass Interval**: Configurable automatic release interval (milliseconds, 0 = disabled)
- **TTL Support**: Messages can have a time-to-live property; expired messages are filtered out before release
- **Queue Count**: All released messages include `_queueCount` property indicating remaining queue length

### Key Functions

- `bypassQueue()` (line 31-56): Manages automatic interval-based message release
- `setBusyTrue/False()` (lines 21-29): Controls node busy state
- `stopBypassTimer()` (line 58-61): Clears active bypass timer
- `isNormalInteger()` (lines 17-19): Validates TTL values

## Configuration

Node configuration (simple-message-queue.html:21-25):
- `name`: Node label
- `firstMessageBypass`: Boolean, whether first message bypasses queue (default: true)
- `bypassInterval`: String, milliseconds for automatic release (default: "0", validated as positive integer)

## Publishing

This package is published to npm. To publish:
```bash
npm publish
```

Note: There are currently no automated tests configured (package.json scripts only has a placeholder test command).

## Testing Manually

Use the demo flow from README.md which includes test cases for:
- Messages with TTL
- Trigger messages
- Reset functionality
- Bypass mode (enable/disable)
- Queue count queries
- Bypass interval changes
