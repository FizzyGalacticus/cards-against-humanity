'use strict';

const handlers = {};

module.exports = socket => Object.entries(handlers).forEach(([event, cb]) => socket.on(event, cb));
