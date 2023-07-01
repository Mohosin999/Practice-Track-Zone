import React, { useState } from "react";
import shortid from "shortid";
import useClock from "../use-clock/useClock";

const useEvent = () => {
  const [events, setEvents] = useState([]);
  const { date, timezone, offset } = useClock();

  const createEvent = (text) => {
    const newEvent = {
      id: shortid.generate(),
      text,
      date,
      timezone,
      offset,
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const editEvent = (id, newText) => {
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents];
      const eventIndex = updatedEvents.findIndex((event) => event.id === id);
      if (eventIndex !== -1) {
        updatedEvents[eventIndex].text = newText;
      }
      return updatedEvents;
    });
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter((event) => event.id !== id);
      return updatedEvents;
    });
  };

  return { events, createEvent, editEvent, deleteEvent };
};

export default useEvent;
