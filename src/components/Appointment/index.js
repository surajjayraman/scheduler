import React from 'react';
import useVisualMode from 'hooks/useVisualMode';

// Appointment child componenets
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';

import "components/Appointment/styles.scss";

// transition mode constants
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';

export default function Appointment(props) {
  // call useVisualMode Hook
  const {mode, transition, back} = useVisualMode( props.interview ? SHOW : EMPTY );
    return (
        <article className="appointment">
            <Header time={props.time}/>
            {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />}
            {mode === SHOW && (
                <Show
                student={props.interview.student}
                interviewer={props.interview.interviewer.name}
                />
            )}
        </article>
    );
}