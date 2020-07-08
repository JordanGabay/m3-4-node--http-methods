'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const {validate} = require('./public/validation')

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


  .get('/order-confirmed', (req, res) => {
    // res.sendFile(__dirname + "/public/order-confirmed.html", {title: "HELLO"})
    const { name, product, province } = req.query
    res.render('pages/order-confirmed', { name, product, province})
  })

  // endpoints
  .post('/order', (req, res) => {
    // console.log(req.body)
    const info = req.body
    // console.log(info)
    const isValid= validate(info)
    const { givenName, order, province } = info
    const { status, error } = isValid
    res.send({status, error, givenName, order, province})
    // console.log(validated)
   
    

  })

  .get('*', (req, res) => res.send('Dang. 404.'))
  .listen(8000, () => console.log(`Listening on port 8000`));
