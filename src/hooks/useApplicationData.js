import { useState, useEffect } from 'react';
import axios from 'axios';

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

    // make data persistent
    // call setState with new state object
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState(prev => ({...prev, appointments: appointments}))
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