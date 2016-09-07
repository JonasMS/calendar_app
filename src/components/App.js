import React, { Component } from "react";
import Calendar from "./Calendar";
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
import { numToTime, timeToString } from "../modules/";
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
    this.generateCalTimes = this.generateCalTimes.bind(this);
  }

  componentDidMount() {
    this.layOutDay([
        { start: 30, end: 150 },
        { start: 540, end: 600 },
        { start: 560, end: 620 },
        { start: 610, end: 670 },
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
    // return `${time.start}`;
    return this.formatTime(time, 0);
  }

  generateCalTimes() {
    const calTimes = [];
    for (let i = 0; i <= END_TIME; i += INCREMENT) {
      calTimes.push(numToTime(i));
    }
    return calTimes;
  }

  render() {
    return (
      <div className="App">
        <Calendar
          startTime={{hour: START_HOUR, min: START_MIN, meridiem: START_MERIDIEM}}
          endTime={{hour: END_HOUR, min: END_MIN, meridiem: END_MERIDIEM}}
          increment={INCREMENT}
          times={this.generateCalTimes()}
          events={this.state.events}
          formatTime={this.formatTime}
          formatId={this.formatId}
        />
      </div>
    );
  }
}

export default App;
