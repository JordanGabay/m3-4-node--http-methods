'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const validation = require('./public/validation')

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .set('view engine', 'ejs')



  // endpoints
  .post('/order', (req, res) => {
    // console.log(req.body)
    const info = req.body
    // console.log(info)
    const validated = validation.validate(info)
    console.log(validated)

  })

  .get('*', (req, res) => res.send('Dang. 404.'))
  .listen(8000, () => console.log(`Listening on port 8000`));
