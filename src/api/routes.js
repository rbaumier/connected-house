'use strict';

const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://nurhwizw:zXRmcOQcsnBO@m21.cloudmqtt.com:18728');

module.exports = (io, domains, config, logger, f) => {
  client.on('connect', function() {
    client.subscribe('temperature:sensor:new');
  });

  client.on('error', function(err) {
    console.log("err:", err);
  })

  io.on('connection', function(socket) {
    socket.on('temperature:getAll', (f) => {
      domains.Temperature.find({}, f);
    });

    socket.on('temperature:get', (f) => {
      domains.Temperature.findOne({}, {}, { sort: { 'created_at': -1 } }, function(err, temperature) {
        f(null, temperature);
      });
    });

    socket.on('temperature:limit:new', (temperature, f) => {
      client.publish('temperature', '' + temperature);
    });
  });

  client.on('message', (topic, message) => {
    if (topic === 'temperature:sensor:new') {
      const temperature = message.toString();
      console.log(`saving ${temperature}*C`);
      domains.Temperature.create({
        date: +new Date(),
        value: temperature
      }, (err, createdTemperature) => {
        if (err) {
          return console.log("err:", err);
        }
        io.emit('temperature:sensor:new', createdTemperature);
      });
    }
  });

  f(null, config);
};
