'use strict';

const mqtt = require('mqtt');
const async = require('async');
const _ = require('lodash');
const client = mqtt.connect('mqtt://nurhwizw:zXRmcOQcsnBO@m21.cloudmqtt.com:18728');
const SET_LIMIT = 'temperature:limit:set';
const SENSOR_NEW = 'temperature:sensor:new';


var currentTemperature = 18;

const randomTemperature = (around) => {
  return (Math.random() * 2 + parseInt(around, 10) - 1).toFixed(1);
}

const setTemperatureTo = (limit) => {
  async.eachSeries(_.range(currentTemperature, limit), (n, cb) => {
    currentTemperature = n;
    setTimeout(cb, 5000);
  });
}

client.on('connect', function() {
  console.log('connected');
  client.subscribe(SET_LIMIT);
  client.subscribe(SENSOR_NEW);
});

client.on('message', function(topic, message) {
  if (topic === SET_LIMIT) {
    const limit = message.toString();
    console.log('setting limit to' + limit);
    setTemperatureTo(parseInt(limit, 10));
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
