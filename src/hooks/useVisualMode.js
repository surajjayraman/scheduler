import {useState} from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition(newMode, replace) {
    let newHistory = [...history]
    // if replace is true, removed the last item in history, then add newMode
    if(replace) {
      newHistory = newHistory.slice(0,-1)
    }

    newHistory = [...newHistory, newMode]

    setHistory(newHistory)
    setMode(newMode);
  }

  function back(){
    if (history.length > 1) {

      let newHistory = [...history]
      newHistory = newHistory.slice(0,-1)

      setHistory(newHistory)

      setMode(newHistory[newHistory.length -1])
    }

  }

  return { mode, transition, back };
}