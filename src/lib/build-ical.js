
const moment = require('moment')
const icalToolkit = require('ical-toolkit');
const parseWeeks = require('parse-weeks');

const week0StartEpoch = 1505692800;
const week0StartMoment = moment.unix(week0StartEpoch);

const buildIcal = (timetable) => {
  const builder = new icalToolkit.createIcsFileBuilder()

  builder.calname = 'Brunel Timetable';
  builder.timezone = 'Europe/London';
  builder.tzid = 'Europe/London';
  // builder.method = 'REQUEST';

  // Add each event to builder
  for (var dayIndex in timetable) {
    if (timetable.hasOwnProperty(dayIndex)) {
      var day = timetable[dayIndex];
      
      for (var event in day) {
        if (day.hasOwnProperty(event)) {
          var event = day[event];
          processEvent(dayIndex, event)
        }
      }
      
    }
  }

  function processEvent(dayIndex, event) {
    parseWeeks(event.weeks)
    .forEach(weekNo => {
      let startDate = week0StartMoment.clone()
      startDate.add(weekNo, 'week')
      startDate.add(dayIndex, 'days')
      startDate.add(moment.duration(event.start))
      startDate.subtract(1, 'hour')

      let endDate = week0StartMoment.clone()
      endDate.add(weekNo, 'week')
      endDate.add(dayIndex, 'days')
      endDate.add(moment.duration(event.end))
      endDate.subtract(1, 'hour')

      builder.events.push({
        start: startDate.toDate(),
        end: endDate.toDate(),

        //transp. Will add TRANSP:OPAQUE to block calendar. 
        transp: 'OPAQUE',

        //Event summary, Required: type String 
        summary: [event.description, event.type, '(' + event.activity + ')'].join(' '),
        
        //All Optionals Below 

        //Alarms, array in minutes 
        //  alarms: [15, 10, 5], 

        //Optional, The sequence number in update, Default: 0 
        //  sequence: null,
         
        //Optional if repeating event 
        //  repeating: {
        //    freq: 'DAILY',
        //    count: 10,
        //    interval: 10,
        //    until: new Date()
        //  },
         
        //Optional if all day event 
        //  allDay: true,
         
        //Creation timestamp, Optional. 
        //  stamp: new Date(),
         
        //Optional, floating time. 
        //  floating: false,
         
        //Location of event, optional. 
        location: `${event.room}, Brunel University`,
         
        //Optional description of event. 
        description: JSON.stringify(event, null, 2),
         
        //Optional Organizer info 
        organizer: {
          name: event.staff,
          email: 'contact@brunel.ac.uk',
          //  sentBy: 'person_acting_on_behalf_of_organizer@email.com' //OPTIONAL email address of the person who is acting on behalf of organizer. 
        },
         
         //Optional attendees info 
        //  attendees: [
        //    {
        //      name: 'A1', //Required 
        //      email: 'a1@email.com', //Required 
        //      status: 'TENTATIVE', //Optional 
        //      role: 'REQ-PARTICIPANT', //Optional 
        //      rsvp: true //Optional, adds 'RSVP=TRUE' , tells the application that organiser needs a RSVP response. 
        //    },
        //    {
        //      name: 'A2',
        //      email: 'a2@email.com'
        //    }
        //  ]
         
         //What to do on addition 
        //  method: 'PUBLISH',
         
        //  Status of event 
        //  status: 'CONFIRMED',
         
         //Url for event on core application, Optional. 
        //  url: 'http://google.com'
       });
    });
  }
  return builder.toString();
}

module.exports = buildIcal