'use strict';

const fastify = require('fastify')();
const fastifyCORS = require('fastify-cors');
const fastifySocket = require('fastify-socket.io');

const socketHandlers = require('./socketHandlers/index.js');

const corsHandler = (origin, cb) => {
    if (/localhost/.test(origin)) {
        //  Request from localhost will pass
        cb(null, true);
        return;
    }

    // Generate an error on other origins, disabling access
    cb(new Error('Not allowed'));
};

fastify.register(fastifyCORS, {
    origin: corsHandler,
});

fastify.register(fastifySocket, {
    // path: '/socket/v1/connect',
    cors: { origin: corsHandler },
});

const logger = console;

fastify.listen(3000, '0.0.0.0', (err, address) => {
    if (err) {
        throw err;
    }

    logger.log(`Listening on ${address}`);

    socketHandlers(fastify.io);
});
