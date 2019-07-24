'use strict';

module.exports = {
  'GET /^\/management\/[^\/]+|\/$/ R': "management",
  'GET /^\/user\/[^\/]+/ R': "login"
}