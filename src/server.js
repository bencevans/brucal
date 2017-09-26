const path = require('path');
const express = require('express');
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

// HTTP Basic Authentication has been removed in favour of a token in the URL
// due to Google Calendar not supporting iCal from URLs containing Basic
// Authentication credentials.

app.get(`/${config.ACCESS_TOKEN}/cal.ical`, (req, res) => {
  retreiveTimetable(config.BRUNEL_ID, config.BRUNEL_PASS, {}, (err, timetable) => {
    const ical = buildIcal(timetable)
    res.end(ical)
  })

})

app.listen(config.PORT, () => {
  console.log(`--> Server Started [http://0.0.0.0:${config.PORT}]

  Your calendar is available at http://0.0.0.0:${config.PORT}/${config.ACCESS_TOKEN}/cal.ical
  `)
})