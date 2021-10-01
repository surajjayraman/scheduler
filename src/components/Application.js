import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview} from 'helpers/selectors';

export default function Application(props) {
  // managing state by combining
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  // to to populate the appointments based on the day selected
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview} 
      />
    );
  });

  // function to update the state of day
  const setDay = day => setState({...state, day});
  //const setDays = days => setState(prev => ({...prev, days}));

  // GET requests to fetch days, appointments and interviewers.
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      console.log(all[1].data);
      setState(prev => ({...prev, days: all[0].data, appointments: {...all[1].data}, interviewers: all[2].data }));
    })

  }, []);

  return (
    <main className="layout">
      <section className="sidebar">        
        <img  className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList 
          days={state.days}
          day={state.day}
          setDay={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" />        
      </section>
      <section className="schedule">
        {dailyAppointments.map( appt => <Appointment key={appt.id} {...appt} />)}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
