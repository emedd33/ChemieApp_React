import React, { Component } from 'react';
import Moment from 'react-moment';
var moment = require('moment'); //time package used to determine ETA and dates.
import 'moment/locale/nb'; //Norwegian language package used with moment()

class TimeAndDate extends Component{

  getReadableDateStringsSocialEvents=(register_open,register_deadline,deregister_deadline)=>{

    let event_register_open = true;
    let time_until_open = null;
    let event_register_closed = false;
    let event_deregister_closed = false;

    let register_open_date = moment(register_open).calendar()
    let register_deadline_date = moment(register_deadline).calendar()
    let deregister_deadline_date = moment(deregister_deadline).calendar()

    if (moment().isBefore(register_open)){
      event_register_open = false;
      let now = moment()
      time_until_open = moment(register_open).from(now);
    }
    if (moment().isAfter(register_deadline)){
      event_register_closed = true;
    }
    if (moment().isAfter(deregister_deadline)){
      event_deregister_closed = true;
    }

    let convertedStrings={
      register_open_date:register_open_date,
      register_deadline_date:register_deadline_date,
      deregister_deadline_date:deregister_deadline_date,

      event_register_open:event_register_open,
      event_register_closed:event_register_closed,
      event_deregister_closed:event_deregister_closed,
      time_until_open:time_until_open,
    }

    return convertedStrings;

  }

}

const timeAndDate = new TimeAndDate();
export default timeAndDate;
