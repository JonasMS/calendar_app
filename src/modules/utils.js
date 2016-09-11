// === Time Utils ===

// return a string representing a time object, according to 12-hour time rules
export const timeToString = (time, meridiem) => (
  `${time.hour}:${time.min > 0 ? time.min : "00" } ${meridiem ? time.meridiem : ""}`
);

// returns true IF timeA occurs on / before timeB, else returns false
export const occursBefore = (timeA, timeB, amBeforePm) => {
  if (timeA.hour === timeB.hour && timeA.min === timeB.min && timeA.meridiem === timeB.meridiem) {
    return true;
  }

  if (timeA.meridiem !== timeB.meridiem) {
    return amBeforePm ?
      timeA.meridiem === "AM" : timeA.meridiem === "PM";
  }

  if (
    (timeA.hour === 12 && timeA.hour - 12 < timeB.hour) ||
    timeA.hour < timeB.hour
  ) {
    return true;
  }

  return timeA.min < timeB.min ? true : false;
}

// add time to clock according to 12-hour time rules
export const addIncrement = (time, increment) => {
  const curTime = Object.assign({}, time);

  curTime.min += increment;
  if (curTime.min >= 60) {
    curTime.hour += Math.floor(curTime.min / 60);
    curTime.min = curTime.min % 60;
  }

  if (curTime.hour >= 12) {
    curTime.meridiem = curTime.meridiem === "AM" ? "PM" : "AM";
    curTime.hour -= curTime.hour > 12 ? 12: 0;
  }
  return curTime;
}


// === Sorting Utils ===

// sort events by event start time, earlier events first
export const sortByStartTime = (eventA, eventB) => {
  if (eventA.start === eventB.start) {
    if (eventA.end === eventB.end) {
      return 0;
    }
    return eventA.end > eventB.end ? -1 : 1;
  }
  return eventA.start < eventB.start ? -1 : 1;
}

// sort conflictEvents by style values, null or lesser .left values first
export const sortByStyle = (eventA, eventB) => {
  if (eventA.val && eventB.val) {
    if (eventA.val.left === eventB.val.left) {
      return 0;
    }
    return eventA.val.left > eventB.val.left ? -1 : 1;
  }
  if (eventA.val) {
    return 1;
  }
  if (eventB.val) {
    return -1;
  }
  return 0;
}
