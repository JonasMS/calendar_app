import React, { Component } from "react";
import CalRow from "./CalRow";
import "../styles/Calendar.scss";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: props.times,
      events: props.events,
    }
    this.renderRows = this.renderRows.bind(this);
  }

  renderRows(times) {
    return times.map((time, idx) => (
      <CalRow
        time={this.props.formatTime(time, idx)}
        id={this.props.formatId(time, idx)}
        key={idx}
      />
    ));
  }

  render() {
    console.log('Calendar: ', this.state);
    return (
      <div className="table-container">
        <table>
          <tbody>
            {this.renderRows(this.props.times)}
          </tbody>
        </table>
      </div>
    );
  }
}

Calendar.propTypes = {
  times: React.PropTypes.array,
  events: React.PropTypes.array,
  formatTime: React.PropTypes.func,
  formatId: React.PropTypes.func,
}

Calendar.defaultProps = {
  times: [],
  events: [],
  formatTime: time => (typeof time === 'string' ? time : time.toString(10)),
  formatId: time => (typeof time === 'string' ? time : time.toString(10)),
}

export default Calendar;
