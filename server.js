'use strict';

const path = require('path');

global.appRoot = path.resolve(__dirname);
global.environment = process.env.NODE_ENV || 'development';

const nconf = require('nconf');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./lib/logger');

async function start() {
    logger.info('[SERVER] Setting up Server');

    const app = express();

    try {
        await require('./app/initializers/nconf')();

        logger.info('[SERVER] Using Morgan for request Logging');

        app.use(require('morgan')('combined', {'stream':logger.stream}));

        logger.info('[SERVER] Configuring Body Parser');

        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

        await require('./app/initializers/log')(app);
        await require('./app/initializers/routes')(app);
        await require('./app/initializers/errors')(app);

        app.listen(nconf.get('port'));
    } catch(e) {
        console.error(e);
        logger.error(e);
    }

    logger.info('[SERVER] Listening on port: ' + nconf.get('port'));
    logger.info('[SERVER] Initialized successfully in ' + environment + ' environment');

    console.info('[VIEW MODEL] Initialized successfully in ' + environment + ' environment');
}

void start();
