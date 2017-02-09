'use strict';

module.exports = (domains) => {
  return {
    get(f) {
      // f(domains.Temperature.get());
      f(13);
    }
  };
};
