import React from 'react';
import useVisualMode from 'hooks/useVisualMode';

// Appointment child componenets
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';

import "components/Appointment/styles.scss";

// transition mode constants
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

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
    // transition to mode based on the Promise resolve / reject
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((err)=> transition(ERROR_SAVE, true));
    
  }

  // delete appointment
  function removeAppt(event) {
    transition(DELETING, true);
     // transition to mode based on the Promise resolve / reject
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true));
    
  }

  // edit an appointment
  function edit(name, interviewer) {
    const interview = {
      student:name,
      interviewer
    };

    transition(SAVING);
    // transition to show / error mode based on the Promise resolve / reject
    props
      .editInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((err)=> transition(ERROR_SAVE, true));
    
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
                onEdit={()=> transition(EDIT)}
                />
            )}
            {mode === CREATE && (
                <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save}/>
            )}

            {mode === SAVING && <Status message={'Saving'}/>}
            {mode === DELETING && <Status message={'Deleting'}/>}
            {mode === CONFIRM && <Confirm message={'Are you sure you would like to delete?'} onCancel={() => back()} onConfirm={removeAppt}/>}
            {mode === EDIT && (<Form interviewers={props.interviewers} onCancel={()=> back()} onSave={edit}  
              name={props.interview.student} interviewer={props.interview.interviewer.id} />)}
            {mode === ERROR_SAVE && <Error message={'Error - could not save the appointment. '} onClose={() => back()}/> }  
            {mode === ERROR_DELETE && <Error message={'Error - could not cancel the appointment. '} onClose={() => back()}/> }
            
        </article>
    );
}