import React from "react";
import timeToString from "../modules/"


const CalRow = ({time, id, addRowRef}) => (
  <tr data-time={id}>
    <td className="time-field">{time}</td>
    <td className="event-field" ref={addRowRef}></td>
  </tr>
);

export default CalRow;
