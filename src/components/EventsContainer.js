import React from "react";
import Event from "./Event";

const getRow = (startTime, rows) => (
  rows.reduce((targetRow, row, idx, collection) => {
    if (!targetRow && row.parentNode.dataset.time <= startTime) {
      targetRow = row;
    }
    return targetRow;
  }, null)
);

const getEventStyle = (event, rowRefs) => {
  debugger;
  const row = getRow(event.start, rowRefs);
  const top = row.offsetTop;

  return {
    position: "relative",
    height: `${event.end - event.start}px`,
    backgroundColor: "blue",
    top,
  }
};

const displayEvents = (events, rowRefs) => (
  events.map((event, key) => (
    <Event info={event} style={getEventStyle(event, rowRefs)} key={key} />
  ))
);

const EventsContainer = ({events, rowRefs, tbodyRef}) => {
  const { top, left, width } = rowRefs[0].getBoundingClientRect();
  // const realWidth = width - rowRefs[0].style.padding - rowRefs[0].style.margin
  const { height } = tbodyRef.getBoundingClientRect();
  const style = {
    position: "absolute",
    padding: "0 10px",
    zIndex: "100",
    top,
    left,
    height,
    width,
  };
  console.log('rowRefs: ', rowRefs);

  return (
    <div className="events-container" style={style}>
      {displayEvents(events, rowRefs)}
    </div>
  );
};

export default EventsContainer;
