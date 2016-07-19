'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ThingSchema.pre('find', function(next){
  this.populate('user', 'name');
  next();
});
ThingSchema.pre('findOne', function(next){
  this.populate('user', 'name');
  next();
});


module.exports = mongoose.model('Thing', ThingSchema);
