var express = require('express');
var router = express.Router();
var conexion = require('../lib/helperMySQL');

/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    res.render('design');
  });
  
  module.exports = router;