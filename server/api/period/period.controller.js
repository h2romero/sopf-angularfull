'use strict';

var _ = require('lodash');
var Period = require('./period.model');

// // Get list of periods
// exports.index = function(req, res) {
//   Period.find(function (err, periods) {
//     if(err) { return handleError(res, err); }
//     return res.status(200).json(periods);
//   });
// };

// Get list of periods by owner
exports.index = function(req, res) {
  Period.find({owner: req.params.owner}, function (err, periods) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(periods);
  });
};


// Get a single period
exports.show = function(req, res) {
  Period.findById(req.params.id, function (err, period) {
    if(err) { return handleError(res, err); }
    if(!period) { return res.status(404).send('Not Found'); }
    return res.json(period);
  });
};

// Creates a new period in the DB.
exports.create = function(req, res) {
  Period.create(req.body, function(err, period) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(period);
  });
};

// Updates an existing period in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Period.findById(req.params.id, function (err, period) {
    if (err) { return handleError(res, err); }
    if(!period) { return res.status(404).send('Not Found'); }
    var updated = _.merge(period, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(period);
    });
  });
};

// Deletes a period from the DB.
exports.destroy = function(req, res) {
  var period = function (name) {
    this._name = name;
  };

  Period.findById(req.params.id, function (err, period) {
    if(err) { return handleError(res, err); }
    if(!period) { return res.status(404).send('Not Found'); }
    period.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
