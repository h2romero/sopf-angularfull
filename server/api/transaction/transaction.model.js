'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TagSchema = new Schema({
  name : {
    type: String
  }
});

var TransactionSchema = new Schema({
  //name: String,
  //info: String,
  //active: Boolean
  account: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  dueDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  isPosted: {
    type: Boolean,
    required: true,
    default: false
  },
  tags: {
    type: [],
    default: []
  },
  owner: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  period: {
    type: Schema.ObjectId,
    required: false,
    ref: 'Period'
  }

});

module.exports = mongoose.model('Transaction', TransactionSchema);
