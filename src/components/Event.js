const Event = ({ event }) => {
  return (
    <ul id="event">
      <h2>{event.summary}</h2>
      <p>{event.start.dateTime}</p>
      <p>{event.location}</p>
      <button>Show Details</button>
    </ul>
  );
};

export default Event;
