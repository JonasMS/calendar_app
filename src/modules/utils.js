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

export const timeToString = (time, idx) => {

}
