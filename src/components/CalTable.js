import React, { Component } from "react";
import CalRow from "./CalRow";


class CalTable extends Component {
  constructor(props) {
    super(props);
  }


  renderRows(times) {
    return times.map((time, idx) => (
      <CalRow
        time={this.props.formatTime(time, idx)}
        id={this.props.formatId(time, idx)}
        key={idx}
      />
    ))
  }

  render() {
    const { times, formatTime, formatId } = this.props;
    return (
       <div className="table-container">
        <table>
          <tbody>
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
      </div>
    );
  }
}

export default CalTable;
