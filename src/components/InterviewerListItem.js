import React from "react";

import "components/InterviewerListItem.scss";

const classNames = require('classnames');

export default function InterviewerListItem(props) {

  const listClass = classNames('interviewers__item', {
    "interviewers__item--selected": props.selected
  });

  return (
    <li className="interviewers__item">
    <img
    className="interviewers__item-image"
    src="https://i.imgur.com/LpaY82x.png"
    alt="Sylvia Palmer"
     />
    Sylvia Palmer
    </li>
  );
}