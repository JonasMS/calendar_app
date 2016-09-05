import React from "react";
import timeToString from "../modules/"


const CalRow = ({time, id}) => {
  <tr data-time={id}>
    <td className="time-field">{time}</td>
    <td className="event-field"></td>
  </tr>
};

export default CalRow;
