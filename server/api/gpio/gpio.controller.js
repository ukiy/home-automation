'use strict';

var _ = require('lodash');
var Gpio = require('./gpio.model');
var gpio = require('node-pi-gpio');

// Get list of gpios
exports.index = function(req, res) {
  Gpio.find(function (err, gpios) {
    if(err) { return handleError(res, err); }
    return res.json(200, gpios);
  });
};

// Get a single gpio
exports.show = function(req, res) {
//  Gpio.findById(req.params.id, function (err, gpio) {
//    if(err) { return handleError(res, err); }
//    if(!gpio) { return res.send(404); }
//    return res.json(gpio);
//  });
  gpio.read(4, function(err, value){
    if(err) return console.log("err", err);
    return res.json(value);
  });
};

// Creates a new gpio in the DB.
exports.create = function(req, res) {
  Gpio.create(req.body, function(err, gpio) {
    if(err) { return handleError(res, err); }
    return res.json(201, gpio);
  });
};

// Updates an existing gpio in the DB.
exports.update = function(req, res) {
//  if(req.body._id) { delete req.body._id; }
//  Gpio.findById(req.params.id, function (err, gpio) {
//    if (err) { return handleError(res, err); }
//    if(!gpio) { return res.send(404); }
//    var updated = _.merge(gpio, req.body);
//    updated.save(function (err) {
//      if (err) { return handleError(res, err); }
//      return res.json(200, gpio);
//    });
//  });
  console.log("call gpio update");
  gpio.open(req.params.id, req.body.mode)
    .then(function(gpio){
      console.log(req.body.mode);
      console.log(req.body.value);
      gpio.value(req.body.value);
      return res.send({mes: 'ok'});
    }).catch(function(err){
      console.log(err);
      return res.send({mes: 'no'});
    });
};

// Deletes a gpio from the DB.
exports.destroy = function(req, res) {
  Gpio.findById(req.params.id, function (err, gpio) {
    if(err) { return handleError(res, err); }
    if(!gpio) { return res.send(404); }
    gpio.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
