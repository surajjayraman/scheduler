import React from 'react';
import useVisualMode from 'hooks/useVisualMode';

// Appointment child componenets
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';

import "components/Appointment/styles.scss";

// transition mode constants
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';

export default function Appointment(props) {
  // call useVisualMode Hook
  const {mode, transition, back} = useVisualMode( props.interview ? SHOW : EMPTY );

  // save function
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    // show the SAVING indicator before calling props.bookInterview
    transition(SAVING);
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }

  // delete appointment
  function removeAppt() {
    transition(DELETING);
    props.cancelInterview(props.id)
    transition(EMPTY);
  }



    return (
        <article className="appointment">
            <Header time={props.time}/>
            {mode === EMPTY && <Empty onAdd={()=> transition(CREATE)}/>}
            {mode === SHOW && (
                <Show
                student={props.interview.student}
                interviewer={props.interview.interviewer.name}
                onDelete={()=> transition(CONFIRM)}
                />
            )}
            {mode === CREATE && (
                <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save}/>
            )}

            {mode === SAVING && <Status message={'Saving'}/>}
            {mode === DELETING && <Status message={'Deleting'}/>}
            {mode === CONFIRM && <Confirm message={'Are you sure you would like to delete?'} onCancel={() => back()} onConfirm={removeAppt}/>}
        </article>
    );
}