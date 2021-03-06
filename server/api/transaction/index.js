'use strict';

var express = require('express');
var controller = require('./transaction.controller');

var router = express.Router();


var auth = require('../../auth/auth.service');

router.get('/:owner/:period', auth.isAuthenticated(), controller.index);
//router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.get('/clone/period/:period', auth.isAuthenticated(), controller.duplicate);

module.exports = router;
