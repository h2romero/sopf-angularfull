'use strict';

var _ = require('lodash');
var Transaction = require('./transaction.model');
var Period = require('../period/period.model');
var Db = require('mongodb').Db,
  MongoClient = require('mongodb').MongoClient,
  Server = require('mongodb').Server,
  ReplSetServers = require('mongodb').ReplSetServers,
  ObjectID = require('mongodb').ObjectID,
  Binary = require('mongodb').Binary,
  GridStore = require('mongodb').GridStore,
  Grid = require('mongodb').Grid,
  Code = require('mongodb').Code,
  assert = require('assert');
var async = require("async");


// // Get list of transactions
// exports.index = function(req, res) {
//   Transaction.find(function (err, transactions) {
//     if(err) { return handleError(res, err); }
//     return res.status(200).json(transactions);
//   });
// };

// Get list of transactions by owner
exports.index = function(req, res) {
  Transaction.find({owner: req.params.owner, period: req.params.period}, function (err, transactions) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(transactions);
  });
};

// Duplicate documents
exports.duplicate = function(req, res) {

      Transaction.find({period: req.params.period}, function (err, transactions) {
            if (err) {
              return handleError(res, err);
            }

            var newPeriod = {};
            Period.findById(req.params.period, function (err, period) {
                  if(err) { return handleError(res, err); }
                  if(!period) { return res.status(404).send('Not Found'); }
                  console.log('period ' + period.readableName);
                  period._id = new ObjectID();
                  period.readableName = 'Clone - ' + period.readableName;

                  Period.create(period, function(err, newperiod) {

                        if(err) { return handleError(res, err); }
                        //noinspection JSAnnotator
                        console.log('newperiod created ' + newperiod.readableName);

                    function callback () {
                      console.log('return newperiod ' + newperiod.readableName);
                      return res.status(201).json(newperiod);
                    }
                    function callTrans(docs) {
                      var c = 0;
                      docs.forEach(function (doc, index, array) {
                        Transaction.create(doc, function (err, transaction) {
                          if (err) {
                            return handleError(res, err);
                          }
                          console.log('transaction created ' + transaction.account);
                          c++;
                          if (c === array.length) {
                            callback();
                          }
                        });
                      });

                    }
                    var docsProcessed = 0;
                    var docs = [];
                        transactions.forEach(function (doc, index, array) {
                                  if (!doc) {
                                    return res.status(404).send('Not Found');
                                  }
                                  doc._id = new ObjectID();
                                  doc.period = newperiod._id;
                                  console.log('transactions forEach ' + doc.account);
                                  docs.push(doc);
                                  docsProcessed++;
                                  if (docsProcessed === array.length) {
                                    callTrans(docs);
                                  }
                          });

                  });
            });
      });
};

// // Get a single transaction
// exports.show = function(req, res) {
//   Transaction.findById(req.params.id, function (err, transaction) {
//     if(err) { return handleError(res, err); }
//     if(!transaction) { return res.status(404).send('Not Found'); }
//     return res.json(transaction);
//   });
// };

// Get a single transaction by owner
exports.show = function(req, res) {
  Transaction.findOne({ _id: req.params.id }, function (err, transaction) {
    if(err) { return handleError(res, err); }
    if(!transaction) { return res.status(404).send('Not Found'); }
    return res.json(transaction);
  });
};


// Creates a new transaction in the DB.
exports.create = function(req, res) {
  Transaction.create(req.body, function(err, transaction) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(transaction);
  });
};

// Updates an existing transaction in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Transaction.findById(req.params.id, function (err, transaction) {
    if (err) { return handleError(res, err); }
    if(!transaction) { return res.status(404).send('Not Found'); }
    // var updated = _.merge(transaction, req.body);
    var updated = _.extend(transaction, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(transaction);
    });
  });
};

// Deletes a transaction from the DB.
exports.destroy = function(req, res) {
  Transaction.findById(req.params.id, function (err, transaction) {
    if(err) { return handleError(res, err); }
    if(!transaction) { return res.status(404).send('Not Found'); }
    transaction.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
