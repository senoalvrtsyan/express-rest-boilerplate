'use strict';

/**
 * Module Dependencies
 */

const app = require('express')();
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const winston = require('winston');
const config = require('./config');
const { api } = require('./routes');

/**
 * Other Middleware
 */

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(helmet());
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    if (req.headers['access-control-request-headers']) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
      res.header('Access-Control-Allow-Credentials', 'true');
    }
    return res.end();
  }
  next();
});

/**
 * Routes
 */

app.use('/api', api);

/**
 * Middleware For Not Found
 */

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Production error handler
 */

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({message: err.message, error: err});
});

/**
 * Application listening on PORT
 */

app.listen(config.port, winston.log('info', `Node.js server is running at http://localhost:${config.port} 
    in ${process.env.NODE_ENV} mode with process id ${process.pid}`));

/**
 * Checking Uncaught Exceptions
 */

process.on('uncaughtException', err => {
  winston.log('error', (new Date).toUTCString() + ' uncaughtException:', err.message);
  winston.log('info', err.stack);
  process.exit(1);
});

/**
 * Checking Unhandled Rejection
 */

process.on('unhandledRejection', err => {
  winston.log('error', (new Date).toUTCString() + ' unhandledRejection:', err.message);
  winston.log('info', err.stack);
  process.exit(1);
});
