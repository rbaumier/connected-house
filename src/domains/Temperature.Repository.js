'use strict';

const mongoose = require('mongoose');
const TemperatureSchema = mongoose.Schema({
  date: Date,
  value: Number
});

return mongoose.model('Temperature', TemperatureSchema);
