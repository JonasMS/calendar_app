import { START_HOUR, START_MIN, START_MERIDIEM } from "../constants";

// given a number 0 to 720, return an object
// representing the corresponding time
export const numToTime = num => {
  const curTime = { hour: START_HOUR, min: START_MIN, meridiem: START_MERIDIEM };
  let addedTimeHour = Math.floor(num / 60);
  let addedTimeMin = num % 60;

  curTime.min += addedTimeMin;
  if (curTime.min >= 60) {
    addedTimeHour++;
    curTime.min -= 60;
  }

  curTime.hour += addedTimeHour;

  if (curTime.hour >= 12) {
    curTime.meridiem = curTime.meridiem === "AM" ? "PM" : "AM";
    curTime.hour -= curTime.hour > 12 ? 12: 0;
  }
  return curTime;
};

export const timeToString = (time, meridiem) => (
  `${time.hour}:${time.min > 0 ? time.min : "00" } ${meridiem ? time.meridiem : ""}`
);

// returs true IF timeA occurs on / before timeB, else returns false
export const occursBefore = (timeA, timeB, amBeforePm) => {
  if (timeA.hour === timeB.hour && timeA.min === timeB.min && timeA.meridiem === timeB.meridiem) {
    return true;
  }

  if (timeA.meridiem !== timeB.meridiem) {
    return amBeforePm ? timeA.meridiem === "AM" && timeB.meridiem === "PM" :
      timeA.meridiem === "PM" && timeB.meridiem === "AM";
  }

  if (
    (timeA.hour === 12 && timeA.hour - 12 < timeB.hour) ||
    timeA.hour < timeB.hour
  ) {
    return true;
  }

  if (timeA.min < timeB.min) {
    return true;
  }

  return false;
}

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
