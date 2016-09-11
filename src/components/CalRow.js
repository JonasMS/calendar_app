import React from 'react';
import timeToString from '../modules/'


const CalRow = ({time, id, addRowRef}) => {
  const timeProp = time.split(" ");
  return (
    <tr data-time={id}>
      <td className="time-field">
        <div className="time-container">
          <div className={timeProp[1] ? "primary" : "secondary"}>{timeProp[0]}</div>
          {
            timeProp[1] ?
              <div className="meridiem">{timeProp[1]}</div>
              :
              ""
          }
        </div>
      </td>
      <td className="event-field" ref={addRowRef}></td>
    </tr>
  )
};

export default CalRow;
