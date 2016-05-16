'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TransactionSchema = new Schema({
  //name: String,
  //info: String,
  //active: Boolean
  account: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  pay: {
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
  owner: {
    type: Schema.ObjectId,
    ref: 'User'
  }

});

module.exports = mongoose.model('Transaction', TransactionSchema);
