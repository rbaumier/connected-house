'use strict';

const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://nurhwizw:zXRmcOQcsnBO@m21.cloudmqtt.com:18728')

client.on('connect', function () {
  client.subscribe('temperature');
});

client.on('message', function (topic, message) {

  console.log(message.toString())
});

console.log('ready');
