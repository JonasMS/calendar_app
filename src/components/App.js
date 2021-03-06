import React, { Component } from 'react';
import Calendar from './Calendar';
import {
  START_HOUR,
  START_MIN,
  START_MERIDIEM,
  END_HOUR,
  END_MIN,
  END_MERIDIEM,
  END_TIME,
  INCREMENT
} from "../constants";
import { timeToString } from "../modules/";
import "../styles/App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
    }

    this.layOutDay = this.layOutDay.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.formatId = this.formatId.bind(this);

    // make layOutDay globally available
    window.layOutDay = this.layOutDay;
  }

  componentDidMount() {
    this.layOutDay([
        { start: 30, end: 150, title: "Sample Item", location: "Sample Location" },
        { start: 540, end: 600, title: "Sample Item", location: "Sample Location" },
        { start: 560, end: 620, title: "Sample Item", location: "Sample Location" },
        { start: 610, end: 670, title: "Sample Item", location: "Sample Location" },
      ],
    );
  }

  layOutDay(events) {
    this.setState({events})
  }

  formatTime(time, idx) {
    return timeToString(time, idx % 2 === 0);
  }

  formatId(time, idx) {
    return idx * INCREMENT;
  }

  render() {
    return (
      <div className="App">
        <Calendar
          startTime={{hour: START_HOUR, min: START_MIN, meridiem: START_MERIDIEM}}
          endTime={{hour: END_HOUR, min: END_MIN, meridiem: END_MERIDIEM}}
          increment={INCREMENT}
          events={this.state.events}
          formatTime={this.formatTime}
          formatId={this.formatId}
        />
      </div>
    );
  }
}

export default App;
