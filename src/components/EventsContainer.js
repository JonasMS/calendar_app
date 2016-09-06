import React from "react";

const EventsContainer = ({events, rowElements, tbodyElement}) => {
  const { top, left, width } = rowElements[0].getBoundingClientRect();
  const { height } = tbodyElement.getBoundingClientRect();
  const style = {
    position: "absolute",
    padding: "0 10px",
    top,
    left,
    height,
    width,
  };

  return (
    <div
      className="events-container"
      style={style}
    >
    </div>
  );
};

export default EventsContainer;
