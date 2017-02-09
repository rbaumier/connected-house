'use strict';
require('./bootstrap');
const mongoose = require('mongoose');

module.exports = function(io, logger, f) {
  const config = require('./config')(logger);

  mongoose.connect(config.mongodb.connectionString);
  mongoose.connection.on('error', f);

  const domains = require('./domains')(mongoose);

  require('./api')(io, domains, config, logger, f);
};
