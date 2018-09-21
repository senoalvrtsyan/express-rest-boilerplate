'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('hey');
});

router.post('/:text', (req, res) => {
  res.send(`text`);
});

router.put('/:text', (req, res) => {
  res.send(`text`);
});

router.delete('/:text', (req, res) => {
  res.send('deleted');
});

module.exports = router;
