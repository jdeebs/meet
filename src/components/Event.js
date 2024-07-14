const Event = ({ event }) => {
  return (
    <div id="event">
      <h2>{event.summary}</h2>
      <p>{event.start.dateTime}</p>
      <p>{event.location}</p>
      <button>Show Details</button>
    </div>
  );
};

export default Event;
