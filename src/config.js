'use strict';

module.exports = (logger) => {
  const env = require('common-env/withLogger')(logger);
  return env.getOrElseAll({
    api: {
      port: 3003
    },

    mongodb: {
      connectionString: 'mongodb://127.0.0.1:27017/connected-house?auto_reconnect`'
    }
  });
};
