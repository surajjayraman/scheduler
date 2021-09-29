import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');


export default function DayListItem(props) {
    const dayClass = classNames("day-list__item", {
        "day-list__item--selected": props.selected,
        "day-list__item--full": props.spots === 0
      });

    function formatSpots() {
        if (props.spots > 1) {
          return `${props.spots} spots remaining`;
        } else if (props.spots === 1) {
          return '1 spot remaining';
        } else {
          return 'no spots remaining';
        }
    }  

    return (
      <li onClick={() => props.setDay(props.name)} className={dayClass}>
        <h2 className="text--regular">{props.name}</h2>
        <h3 className="text--light">{formatSpots()}</h3>
      </li>
    );
  }