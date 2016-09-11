import React from "react";

const Event = ({info, style}) => (
  <div className="event" style={style}>
    <div className="left-border"></div>
    <div className="event-body">
      <div className="event-content">
        <div className="title">{info.title ? info.title : ""}</div>
        <div className="location">{info.location ? info.location : ""}</div>
      </div>
    </div>
  </div>
);

export default Event;
