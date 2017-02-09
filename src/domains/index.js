'use strict';

module.exports = (mongoose) => {
  return {
    Temperature: require('./Temperature.Repository')(mongoose)
  };
};
