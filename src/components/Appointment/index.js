import React from 'react';
import useVisualMode from 'hooks/useVisualMode';

// Appointment child componenets
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';

import "components/Appointment/styles.scss";

// transition mode constants
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

export default function Appointment(props) {
  // call useVisualMode Hook
  const {mode, transition, back} = useVisualMode( props.interview ? SHOW : EMPTY );

  // save function
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    return props.bookInterview(props.id, interview);
  }


    return (
        <article className="appointment">
            <Header time={props.time}/>
            {mode === EMPTY && <Empty onAdd={()=> transition(CREATE)} />}
            {mode === SHOW && (
                <Show
                student={props.interview.student}
                interviewer={props.interview.interviewer.name}
                />
            )}
            {mode === CREATE && (
                <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save}/>
            )}
        </article>
    );
}