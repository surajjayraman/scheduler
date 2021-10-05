import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from 'helpers/selectors';

export default function Application(props) {
  // managing state by combining
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  // book an interview
  function bookInterview(id, interview) {
    // add appointment object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // update pattern to replace existing record with the matching id
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // make data persistent
    // call setState with new state object
    return axios.put(`/api/appointments/${id}`, appointment).then(res => {
      console.log(res);
    }).then(setState(prev => ({...prev, appointments: appointments})));     
  }

  // cancel an interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`, appointment).then(res => {
      console.log(res);
    }).then(setState(prev => ({...prev, appointments: appointments})));
    
  }
  
  // edit an Interview
  function editInterview(id, interview) {
    console.log('was this function called?');
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
   
    return axios.put(`/api/appointments/${id}`, appointment).then(res => {
      console.log(res)
    }).then(setState(prev => ({...prev, appointments: appointments})));
  }

  // to to populate the appointments based on the day selected
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // interviewers array to be passed to the appointment component
  const interviewersArr = getInterviewersForDay(state, state.day)

  // create schedule for the day selected with the interviewer name
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersArr} 
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        editInterview={editInterview}
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
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="" />        
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
