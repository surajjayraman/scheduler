import { useState, useEffect } from 'react';
import axios from 'axios';

// returns an object with keys => state, setDay, bookInterview,
// cancelInterview, editInterview
export default function useApplicationData() {
// transferred over from application js

  // managing state by combining
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  // function to update the state of day
  const setDay = day => setState({...state, day});

  // update the spots based on interview exists or not
  function updateSpots(interview){
    // find the dayObj based on day selected
    const dayObj = state.days.find(eachDay => eachDay.name === state.day)
    // update spots according to appointment.interview
    interview ? dayObj.spots -= 1 : dayObj.spots += 1
    // create a new days obj to be updated with setState
    const days = [...state.days]
    days[dayObj.id - 1] = dayObj
    return days
  }

  // book an Interview appointment
  function bookInterview(id, interview) {
    // add appointment object
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }

    // update pattern to replace existing record with the matching id
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    // implements the spots remaining feature
    const days = updateSpots(appointment.interview);

    // make data persistent
    // call setState with new state object
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState(prev => ({...prev, appointments: appointments, days: days}));
    })
  }

  // cancel an Interview appointment
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState(prev => ({...prev, appointments: appointments}))
    })

  }

  // edit an Interview appointment
  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState(prev => ({...prev, appointments: appointments}))
    })

  }

  // collect data from api
  // GET requests to fetch days, appointments and interviewers.
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: {...all[1].data}, interviewers: all[2].data }))
    })
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview
  }

} 