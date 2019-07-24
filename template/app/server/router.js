'use strict';

require('@fmd/module');

module.exports = {
  'GET /^\/management\/[^\/]+|\/$/ R': "management",
  'GET /^\/user\/[^\/]+/ R': "login"
}