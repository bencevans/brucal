const path = require('path');
const express = require('express');
const basicAuth = require('basic-auth');
const {retreiveTimetable, buildIcal} = require('./');

const app = express();

const config = {
  PORT: process.env.PORT || 3000,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN || 'awe9d8aj3e9wjewea',
  BRUNEL_ID: process.env.BRUNEL_ID,
  BRUNEL_PASS: process.env.BRUNEL_PASS
}

if (!config.ACCESS_TOKEN) {
  throw new Error('Missing ACCESS_TOKEN')
}

if (!config.BRUNEL_ID) {
  throw new Error('Missing BRUNEL_ID')
}

if (!config.BRUNEL_PASS) {
  throw new Error('Missing BRUNEL_PASS')
}

const basicAuthUtil = function(username, password) {
  return function(req, res, next) {
    var user = basicAuth(req);

    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.send(401);
    }

    next();
  };
};

app.use(basicAuthUtil(config.ACCESS_TOKEN, ''))

app.get('/cal.ical', (req, res) => {
  console.log('retri')
  retreiveTimetable(config.BRUNEL_ID, config.BRUNEL_PASS, {}, (err, timetable) => {
    const ical = buildIcal(timetable)
    res.end(ical)
  })

})

app.listen(config.PORT, () => {
  console.log(`--> Server Started [http://0.0.0.0:${config.PORT}]

  Your calendar is available at http://${config.ACCESS_TOKEN}:@0.0.0.0:${config.PORT}/cal.ical
  `)
})