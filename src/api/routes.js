'use strict';

const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://nurhwizw:zXRmcOQcsnBO@m21.cloudmqtt.com:18728');
const limit = 50;

module.exports = (io, domains, config, logger, f) => {
  client.on('connect', function() {
    client.subscribe('temperature:sensor:new');
    client.subscribe('temperature:sensor:alert');
  });

  client.on('error', function(err) {
    console.log("err:", err);
  })

  io.on('connection', function(socket) {
    socket.on('temperature:getAll', (f) => {
      domains.Temperature.find({}, f);
    });

    socket.on('temperature:limit:new', (temperature, f) => {
      console.log('limit reached');
      client.publish('temperature:limit:set', '' + temperature);
    });
  });

  client.on('message', (topic, message) => {
    if(topic === 'temperature:sensor:alert') {
      console.log('alert')
      io.emit('temperature:sensor:alert', message.toString());
      return;
    }

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
        // if(createdTemperature.value > limit) {
        //   io.emit('temperature:sensor:alarm', createdTemperature);
        // }
      });
    }
  });

  f(null, config);
};
