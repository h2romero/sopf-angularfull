/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Period = require('./period.model');

exports.register = function(socket) {
  Period.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Period.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('period:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('period:remove', doc);
}