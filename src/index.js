'use strict';
require('./bootstrap');
const mongoose = require('mongoose');

module.exports = function(app, logger, f) {
  const config = require('./config')(logger);
  const services = require('./services')(config);

  mongoose.connect(config.mongodb.connectionString);
  mongoose.connection.on('error', f);

  const domains = require('./domains')();

  require('./api')(app, domains, services, config, logger, f);
};
