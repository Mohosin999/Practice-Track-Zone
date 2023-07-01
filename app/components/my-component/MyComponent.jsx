import React from "react";
import useEvent from "@/app/hooks/use-event/useEvent";

const MyComponent = () => {
  const { events, createEvent, editEvent, deleteEvent } = useEvent();

  return (
    <div>
      <h2>Create Event</h2>
      <button onClick={() => createEvent("New Event")}>Create</button>

      <h2>Events</h2>
      {events.map((event, index) => (
        <div key={index}>
          <div>Date: {event.date.toString()}</div>
          <div>Timezone: {event.timezone}</div>
          <div>Offset: {event.offset}</div>
          <div>
            Text: {event.text}{" "}
            <button onClick={() => editEvent(index, "Edited Text")}>
              Edit
            </button>{" "}
            <button onClick={() => deleteEvent(index)}>Delete</button>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
