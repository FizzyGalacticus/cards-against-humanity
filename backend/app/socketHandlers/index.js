'use strict';

const handleClients = require('./client');

const logger = console;

const connect = socket => {
    const { id } = socket;

    logger.log(`Client ${id} connected`);

    handleClients(socket);
};

const handlers = { connect };

module.exports = io => Object.entries(handlers).forEach(([event, cb]) => io.on(event, cb));
