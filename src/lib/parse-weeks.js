const debug = require('debug')('parseWeeks');

module.exports = function parseWeeks(str) {
  let finishedSearch = false;
  const weeks = []
  while(finishedSearch === false) {
    debug(`str: ${str}`)
    const match = str.match(/^,? ?(\d+(?:-\d+)?)/);

    // Stop if complete
    if (match === null) {
      finishedSearch = true;
      return weeks;
    }

    if (match[1].indexOf('-') > -1) {
      // Handle Ranges
      let [begining, end] = match[1].split('-');
      begining = parseInt(begining, 10);
      end = parseInt(end, 10);
      debug(`${begining} to ${end}`)
      for (let week = begining; week <= end; week++) {
        weeks.push(week)
      }
    } else {
      // Handle singular week
      const weekNo = parseInt(match[1], 10);
      weeks.push(weekNo)

      debug(`week no: ${typeof weekNo} ${weekNo}`)
      debug(`match: ${match[0]} length: ${match.length}`)
    }

    str = str.substr(match[0].length)
    debug(' ')
  }
}