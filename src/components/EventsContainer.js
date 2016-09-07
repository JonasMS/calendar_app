import React from "react";
import Event from "./Event";

const getEventStyle = (event, rowRefs) => {
  // const row = rowRefs.filter(row => row.dataset.data-time)
};

const displayEvents = (events, rowRefs) => (
  events.map(event => (
    <Event info={event} style={getEventStyle(event, rowRefs)} />
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

  return (
    <div className="events-container" style={style}>
      <Event style={{backgroundColor: "blue"}} />
    </div>
  );
};

export default EventsContainer;
