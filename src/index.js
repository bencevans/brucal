const TimetableService = require('brutime');
const parseWeeks = require('parse-weeks');
const buildIcal = require('./lib/build-ical');

// Retreive

const retreiveTimetable = (u, p, opts, cb) => {
  const timetableService = new TimetableService({
    login: u,
    password: p,
    year: '1718'
  });

  timetableService.getMyModulesTimetable({
    period: '1-52',
    days: '1-7',
    year: '1718'
  }, cb)
}

module.exports = {
  retreiveTimetable,
  parseWeeks,
  buildIcal
};
