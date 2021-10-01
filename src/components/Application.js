import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";

// Mock Appointment Data
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm"
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Suraj Nair",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  },
];

export default function Application(props) {
  // render selected day
  const [day, setDay] = useState("Monday");

  // Storing the Days Data
  // receive Days data from api/days and set as days array
  const [days, setDays] = useState([]);

  // GET request to /api/days using axios
  useEffect(() => {
    axios.get('/api/days').then(res => setDays(res.data))
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">        
        <img  className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList 
          days={days}
          day={day}
          setDay={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" />        
      </section>
      <section className="schedule">
        {appointments.map( appt => <Appointment key={appt.id} {...appt} />)}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
