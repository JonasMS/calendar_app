import React, { Component } from "react";
// import CalTable from "./CalTable";
import CalRow from "./CalRow";
import EventsContainer from "./EventsContainer";

import "../styles/Calendar.scss";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: props.times,
      events: props.events,
    }
    this.renderRows = this.renderRows.bind(this);
    this.addRowRef = this.addRowRef.bind(this);
    // this.setCalElement = this.setCalElement.bind(this);
    this.rowRefs = [];
    this._tbody = null;
    // this.calElement = null;
  }

  componentDidMount() {

  }

  renderRows(times) {
    return times.map((time, idx) => (
      <CalRow
        time={this.props.formatTime(time, idx)}
        id={this.props.formatId(time, idx)}
        addRowRef={row => this.rowRefs.push(row)}
        key={idx}
      />
    ));
  }

  addRowRef(rowRef) {
    this.rowRefs.push(rowRef);
  }

  // setCalElement(el) {
  //   // debugger;
  //   console.log('CalTable: ', el);
  // }


  render() {
    console.log('Calendar: ', this.state);
    const { times, events, formatTime, formatId } = this.props;
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
              key={times.length - 1}
            />
          </tfoot>
        </table>
        {
          (this.rowRefs.length && this._tbody) ?
            <EventsContainer
              events={events}
              rowElements={this.rowRefs}
              tbodyElement={this._tbody}
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
