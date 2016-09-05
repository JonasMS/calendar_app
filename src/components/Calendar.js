import React, { Component } from "react";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: props.times,
      events: props.events,
    }
  }

  renderRows(times) {
    times.map((time, idx) => (
      <CalRow
        time={props.formatTime(time, idx)}
        id={props.formatId(time, idx)}
        key={idx}
      />
    ));
  }

  render() {
    return (
      <table>
        <tbody>

        </tbody>
      </table>
    );
  }
}

Calendar.propTypes = {
  times: React.PropTypes.array,
  events: React.PropTypes.array
}
Calendar.defaultProps = {
  times: [],
  events: [],
  // create default functions
  // for formatTime && formatId
}

export default Calendar;
