'use strict';

require('@fmd/module');

MI.get(/^\/user\/[^\/]+/, (req, res) => {
    res.render('login');
});

MI.get(/^\/management\/[^\/]+|\/$/, (req, res) => {
    res.render('index');
});