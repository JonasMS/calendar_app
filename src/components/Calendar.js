import React, { Component } from "react";
// import CalTable from "./CalTable";
import CalRow from "./CalRow";
import EventsContainer from "./EventsContainer";
import { occursBefore, addIncrement } from "../modules";

import "../styles/Calendar.scss";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: props.times,
      events: props.events,
    }
    this.generateTimes = this.generateTimes.bind(this)
    this.renderRows = this.renderRows.bind(this);
    this.addRowRef = this.addRowRef.bind(this);
    // this.setCalElement = this.setCalElement.bind(this);
    this.rowRefs = [];
    this._tbody = null;
    // this.calElement = null;
  }

  componentWillMount() {
    this.times = this.generateTimes();
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({events: nextProps.events});
  }

  renderRows(times) {
    return times.map((time, idx) => (
      <CalRow
        time={this.props.formatTime(time, idx)}
        id={this.props.formatId(time, idx)}
        addRowRef={row => this.addRowRef(row)}
        key={idx}
      />
    ));
  }

  addRowRef(rowRef) {
    if (this.rowRefs.length >= this.times.length) {
      this.rowRefs = [];
    }

    this.rowRefs.push(rowRef);
  }

  generateTimes() {
    const { startTime, endTime, increment } = this.props;
    const times = [];
    const amBeforePm = startTime.meridiem === "AM";
    let curTime = Object.assign({}, startTime);

    while (occursBefore(curTime, endTime, amBeforePm)) {
      times.push(curTime);
      curTime = addIncrement(curTime, increment);
    }
    return times;
  }

  // setCalElement(el) {
  //   // debugger;
  //   console.log('CalTable: ', el);
  // }


  render() {
    console.log('Calendar: ', this.state);
    console.log('TIMES: ', this.times);
    const { times } = this;
    const { events, formatTime, formatId } = this.props;
    return (
      <div className="table-container">
        <table>
          <tbody ref={el => this._tbody = el}>
            {this.renderRows(times.slice(0, times.length - 1))}
          </tbody>
          <tfoot>
            <CalRow
              time={formatTime(times[times.length - 1], times.length - 1)}
              id={formatId(times[times.length - 1], times.length - 1)}
              addRowRef={row => this.addRowRef(row)}
              key={times.length - 1}
            />
          </tfoot>
        </table>
        {
          (this.rowRefs.length && this._tbody) ?
            <EventsContainer
              events={events}
              rowRefs={this.rowRefs}
              tbodyRef={this._tbody}
            />
            :
            ""
        }
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
