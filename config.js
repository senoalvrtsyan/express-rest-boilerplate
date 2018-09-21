'use strict';

const {
  PORT,
  MODE
} = process.env;

module.exports = {
  mode: MODE || 'production',
  port: parseInt(PORT) || 3000
};
