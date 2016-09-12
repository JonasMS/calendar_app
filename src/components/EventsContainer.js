import React from 'react';
import Event from './Event';
import { sortByStartTime, sortByStyle } from '../modules/'
import '../styles/EventsContainer.scss';

const setStyleVal = (valA, valB) => (
  typeof valA !== "undefined" ? Math.min(valA, valB) : valB
);

// correctly position events on top of calendar table
const positionEvents = (events, pixelsPerMin) => {
  let conflictingEvents = [];
  let curWidth;
  events.sort(sortByStartTime)
  .forEach((outerEvent, outerIdx, collection) => {
    conflictingEvents.push(outerEvent);

    // build collection of conflictingEvents
    for (let i = outerIdx + 1; i < collection.length; i++) {
      if (collection[i].start <= outerEvent.end) {
        conflictingEvents.push(collection[i]);
        continue;
      }
      break;
    }

    curWidth = 100 / conflictingEvents.length;

    // sort conflictingEvents by style values
    conflictingEvents.sort(sortByStyle)
    .forEach((innerEvent, innerIdx) => {
      // Compare and Set style values
      innerEvent.val = innerEvent.val || {};
      innerEvent.val = Object.assign(innerEvent.val, {
        top: innerEvent.val.top || innerEvent.start * pixelsPerMin,
        left: innerEvent.val.left || innerIdx * curWidth,
        height: innerEvent.height || (innerEvent.end - innerEvent.start) * pixelsPerMin,
        width: setStyleVal(innerEvent.val.width, curWidth),
      });

      // Set styles with correct units
      const { top, left, height, width } = innerEvent.val;
      innerEvent.style = {
        top: `${top}px`,
        left: `${left}%`,
        height: `${height}px`,
        width: `calc(${width}% - 2px)`,
      }
    });
    conflictingEvents = [];
  });
  return events;
}

const displayEvents = (events, pixelsPerMin) => (
  positionEvents(events, pixelsPerMin).map((event, key) => (
    <Event info={event} style={event.style} key={key} />
  ))
);

const EventsContainer = ({events, _row, _tbody, _pixelsPerMin}) => {
  const { top, left, bottom } = _row.getBoundingClientRect();
  const { height } = _tbody.getBoundingClientRect();
  const style = { top, left, height };

  return (
    <div className="events-container" style={style}>
      {displayEvents(events, _pixelsPerMin)}
    </div>
  );
};

export default EventsContainer;
