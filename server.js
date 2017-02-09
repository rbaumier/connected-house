'use strict';

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const logger = require('winston');

require('./src')(io, logger, (err, config) => {
  if (err) {
    logger.error('Start error', err);
    // we don't want our app to start in an unstable state
    throw err;
  }
  server.listen(config.api.port, () => logger.info(`API started and listening on ${config.api.port}`));
});
