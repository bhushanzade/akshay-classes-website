require('dotenv').config();
const express = require('express'),
  app = express(),
  path = require('path'),
  compression = require('compression'),
  port = process.env.PORT ?? 3000;
app.locals.moment = require('moment');
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Sign, X-Pcp-Chat-Auth");
  res.header('Access-Control-Allow-Methods', 'PATCH, PUT, POST, GET, DELETE, OPTIONS, HEAD');
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  next();
});
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
bodyParser = require('body-parser');
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true
}));
app.use('/', require('./src/route'));
app.listen(port, () => {
  console.log("app started at port", port);
});