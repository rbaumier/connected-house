'use strict';

module.exports = (domains) => {
  return {
    temperature: require('./tempature.handlers')(domains)
  };
};
