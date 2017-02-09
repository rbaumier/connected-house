'use strict';

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://nurhwizw:zXRmcOQcsnBO@m21.cloudmqtt.com:18728')
const SET_TEMPERATURE = 'temperature:set';
const SENSOR_NEW = 'temperature:sensor:new';

var currentTemperature = 18;

const randomTemperature = (around) => {
  return (Math.random() * 2 + parseInt(around, 10) - 1).toFixed(1);
}

client.on('connect', function() {
  console.log('connected');
  client.subscribe(SET_TEMPERATURE);
  client.subscribe(SENSOR_NEW);
});

client.on('message', function(topic, message) {
  if (topic === SET_TEMPERATURE) {
    const temperature = message.toString();
    console.log(`Setting temperature to: ${temperature}`);
    var currentTemperature = temperature;
  }
});

(function sendRandomTemperature() {
  setTimeout(function() {
    const temperature = randomTemperature(currentTemperature);
    console.log('sending random temperature: ' + temperature);
    client.publish(SENSOR_NEW, temperature);
    sendRandomTemperature();
  }, 5000);
}());

console.log('ready');
