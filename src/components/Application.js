import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import getAppointmentsForDay from 'helpers/selectors';

export default function Application(props) {
  // managing state by combining
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  // to to populate the appointments based on the day selected
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // function to update the state of day
  const setDay = day => setState({...state, day});
  //const setDays = days => setState(prev => ({...prev, days}));

  // GET request to /api/days using axios
  useEffect(() => {
    //axios.get('/api/days').then(res => setDays(res.data))
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments')
    ]).then((all) => {
      console.log(all[1].data);
      setState(prev => ({...prev, days: all[0].data, appointments: {...all[1].data} }))
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
