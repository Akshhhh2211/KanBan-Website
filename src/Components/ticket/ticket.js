import React from 'react';

function Ticket({ tickets }) {
  return (
    <div>
      <h2>Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <p>Title: {ticket.title}</p>
            <p>Status: {ticket.status}</p>
            <p>Priority: {ticket.priority}</p>
            {/* Add more ticket information as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ticket;
