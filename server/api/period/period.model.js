'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PeriodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  active: {
    type: Boolean,
    required: true,
    default: true
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
  }
});

module.exports = mongoose.model('Period', PeriodSchema);
