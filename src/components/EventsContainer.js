import React from "react";
import Event from "./Event";
import { PIXELS_PER_MIN } from "../constants";

const getRow = (startTime, rows) => (
  rows.reduce((targetRow, row, idx, collection) => {
    if (!targetRow && row.parentNode.dataset.time <= startTime) {
      targetRow = row;
    }
    return targetRow;
  }, null)
);

const getEventStyle = (event, rowRefs) => {

  return {
    position: "absolute",
    top: `${event.start * PIXELS_PER_MIN}px`,
    height: `${(event.end - event.start) * PIXELS_PER_MIN}px`,
    width: "100%",
    backgroundColor: "blue", // TODO: specify in CSS
  }
};

const setStyle = (valA, valB, mathMethod = "min") => (
  typeof valA !== "undefined" ? Math[mathMethod](valA, valB) : valB
);

const styleEvents = events => {
  // debugger;
  let conflictingEvents = [];
  let curWidth;
  events.forEach((outerEvent, outerIdx, outerCollection) => { // TODO, sort events
    conflictingEvents.push(outerEvent);
    // build outerCollection of conflictingEvents
    for (let i = outerIdx + 1; i < outerCollection.length; i++) {
      if (outerCollection[i].start <= outerEvent.end) {
        conflictingEvents.push(outerCollection[i]);
        continue;
      }
      break;
    }

    curWidth = 100 / conflictingEvents.length;

    // sort conflictEvents by style values
    conflictingEvents.sort((eventA, eventB) => {
      if (eventA.val && eventB.val) {
        if (eventA.val.left === eventB.val.left) {
          return 0;
        }
        if (eventA.val.left > B.val.left) {
          return -1;
        }
        return 1;
      }
      if (eventA.val) {
        return 1;
      }
      if (eventB.val) {
        return -1;
      }
      return 0;
    })
    .forEach((innerEvent, innerIdx, innerCollection) => {
      innerEvent.val = innerEvent.val || {};

      innerEvent.val.top = innerEvent.start * PIXELS_PER_MIN; // TODO: replace PIXELS_PER_MIN with _PIXELS_PER_MIN = _PIXELS_PER_ROW / INCREMENT)
      innerEvent.val.left = setStyle(innerEvent.val.left, innerIdx * curWidth, "max");
      innerEvent.val.height = (innerEvent.end - innerEvent.start) * PIXELS_PER_MIN;
      innerEvent.val.width = setStyle(innerEvent.val.width, curWidth);

      const { top, left, height, width } = innerEvent.val;

      innerEvent.style = {
        position: "absolute",
        top: `${top}px`,
        left: `${left}%`,
        height: `${height}px`,
        width: `${width}%`,
      }
    });
    conflictingEvents = [];
  });
  return events;
}

const displayEvents = (events, rowRefs) => (
  styleEvents(events).map((event, key) => (
    <Event info={event} style={event.style} key={key} />
  ))
);

const EventsContainer = ({events, rowRefs, tbodyRef}) => {
  // debugger;
  const { top, left, width } = rowRefs[0].getBoundingClientRect();
  // const realWidth = width - rowRefs[0].style.padding - rowRefs[0].style.margin
  const { height } = tbodyRef.getBoundingClientRect();
  const style = {
    position: "absolute",
    margin: "0 10px", // TODO: define in CSS
    zIndex: "100",
    top,
    left,
    height,
    width: `calc(${width}px - 20px)`,
  };

  return (
    <div className="events-container" style={style}>
      {displayEvents(events, rowRefs)}
    </div>
  );
};

export default EventsContainer;
