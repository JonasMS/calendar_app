import React, { Component } from 'react';
import CalRow from './CalRow';
import EventsContainer from './EventsContainer';
import { occursBefore, addIncrement } from '../modules';
import '../styles/Calendar.scss';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: props.times,
      events: props.events,
    }
    this.generateTimes = this.generateTimes.bind(this)
    this.getPixelsPerMin = this.getPixelsPerMin.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.addRowRef = this.addRowRef.bind(this);
    this._rows = [];
    this._tbody;
    this.times;
  }

  componentWillMount() {
    this.times = this.generateTimes();
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


  // add reference to a row to collection
  addRowRef(_row) {
    if (this._rows.length >= this.times.length) {
      this._rows = [];
    }
    this._rows.push(_row);
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

  getPixelsPerMin(row) {
    const { height } = row.getBoundingClientRect();
    return height / this.props.increment;
  }

  render() {
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
          (this._rows.length && this._tbody) ?
            <EventsContainer
              events={events}
              _row={this._rows[0]}
              _tbody={this._tbody}
              _pixelsPerMin={this.getPixelsPerMin(this._rows[0])}
            />
            :
            ""
        }
      </div>
    );
  }
}

Calendar.propTypes = {
  startTime: React.PropTypes.object,
  endTime: React.PropTypes.object,
  increment: React.PropTypes.number,
  events: React.PropTypes.array,
  formatTime: React.PropTypes.func,
  formatId: React.PropTypes.func,
}

Calendar.defaultProps = {
  startTime: { hour: 0, min: 0, meridiem: "AM" },
  endTime: { hour: 11, min: 59, meridiem: "PM" },
  increment: 30,
  events: [],
  formatTime: time => (typeof time === 'string' ? time : time.toString(10)),
  formatId: time => (typeof time === 'string' ? time : time.toString(10)),
}
