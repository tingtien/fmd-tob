'use strict';

require('@fmd/module');

module.exports = {
  'GET /^\/management\/[^\/]+|\/$/ R': (req, res) => {
    res.render('index');
  },
  'GET /^\/user\/[^\/]+/ R': (req, res) => {
    res.render('login');
  }
}
