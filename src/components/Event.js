const Event = ({ event }) => {
  return (
    <ul id="event">
      <h2>{event.summary}</h2>
      <p>{event.created}</p>
      <p>{event.location}</p>
      <button id="show-details">Show Details</button>
    </ul>
  );
};

export default Event;
