'use strict';

module.exports = (mongoose) => {
  const TemperatureSchema = mongoose.Schema({
    date: Date,
    value: Number
  });

  return mongoose.model('Temperature', TemperatureSchema);
};
