import React from 'react';
import PropTypes from 'prop-types';
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";


export default function InterviewerList(props){
    //Refactor using values from props
    const interviewers = props.interviewers.map(interviewer => {
        return (
          <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === props.interviewer}
            setInterviewer={event => props.setInterviewer(interviewer.id)}
          />
        );
      });
    
    
    return (
        <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
            {interviewers}        
        </ul>
        </section>
    );
}

// Validate that the interviewers prop is an Array and that it is required.
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

