'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GpioSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  pin: {
    num: Number,
    mode: String,
    state: Number
  }
});

module.exports = mongoose.model('Gpio', GpioSchema);
