'use strict';

const bodyParser = require('body-parser');
const compression = require('compression');

module.exports = (io, domains, services, config, logger, f) => {
  const handlers = require('./handlers')(domains, config, logger);
  console.log('ok')
  console.log('ok')
  io.on('connection', function(socket) {
    console.log('connected')
    socket.on('temperature:get', handlers.temperature.get);
  });

  f(null, config);
};
