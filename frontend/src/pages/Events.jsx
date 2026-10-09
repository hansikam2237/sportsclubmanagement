import { useEffect, useState } from 'react'

function Events() {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('sportsClubEvents')

    if (savedEvents !== null) {
      return JSON.parse(savedEvents)
    }

    return [
      {
        id: 1,
        name: 'Annual Sports Meet',
        date: '2026-11-15',
        time: '09:00',
        venue: 'Main Ground',
        status: 'Upcoming',
      },
      {
        id: 2,
        name: 'Badminton Tournament',
        date: '2026-11-22',
        time: '10:00',
        venue: 'Indoor Court',
        status: 'Upcoming',
      },
      {
        id: 3,
        name: 'Swimming Championship',
        date: '2026-12-05',
        time: '09:00',
        venue: 'Swimming Pool',
        status: 'Upcoming',
      },
      {
        id: 4,
        name: 'Basketball Friendly Match',
        date: '2026-12-12',
        time: '16:00',
        venue: 'Basketball Court',
        status: 'Upcoming',
      },
    ]
  })

  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [venue, setVenue] = useState('')

  useEffect(() => {
    localStorage.setItem('sportsClubEvents', JSON.stringify(events))
  }, [events])

  function addEvent(event) {
    event.preventDefault()

    const newEvent = {
      id: Date.now(),
      name: name.trim(),
      date,
      time,
      venue: venue.trim(),
      status: 'Upcoming',
    }

   setEvents((currentEvents) => {
  const updatedEvents = [...currentEvents, newEvent]

  localStorage.setItem(
    'sportsClubEvents',
    JSON.stringify(updatedEvents)
  )

  window.dispatchEvent(new Event('eventsUpdated'))

  return updatedEvents
})

setName('')
setDate('')
setTime('')
setVenue('')
setShowForm(false)
}

  function deleteEvent(id) {
    setEvents((currentEvents) => {
      const updatedEvents = currentEvents.filter(
        (event) => event.id !== id
      )

      localStorage.setItem(
        'sportsClubEvents',
        JSON.stringify(updatedEvents)
      )

      window.dispatchEvent(new Event('eventsUpdated'))

      return updatedEvents
    })
  }

function formatDate(dateString) {
    return new Date(`${dateString}T00:00:00`).toLocaleDateString(
      'en-IN',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }
    )
  }

  return (
    <section className="panel" style={{ marginTop: '28px' }}>
      <div className="panel-heading">
        <div>
          <h2>Club Events</h2>
          <p>Explore upcoming sports club events and tournaments.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          style={{
            background: '#267e85',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 16px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {showForm ? 'Cancel' : '+ Add New Event'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={addEvent}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '25px',
            padding: '18px',
            background: '#f5f7fb',
            borderRadius: '10px',
          }}
        >
          <input
            type="text"
            placeholder="Event name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            style={{
              padding: '11px',
              flex: '1 1 200px',
              border: '1px solid #dbe2ea',
              borderRadius: '7px',
            }}
          />

          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
            style={{
              padding: '11px',
              flex: '1 1 150px',
              border: '1px solid #dbe2ea',
              borderRadius: '7px',
            }}
          />

          <input
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            required
            style={{
              padding: '11px',
              flex: '1 1 120px',
              border: '1px solid #dbe2ea',
              borderRadius: '7px',
            }}
          />

          <input
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(event) => setVenue(event.target.value)}
            required
            style={{
              padding: '11px',
              flex: '1 1 180px',
              border: '1px solid #dbe2ea',
              borderRadius: '7px',
            }}
          />

          <button
            type="submit"
            style={{
              background: '#267e85',
              color: 'white',
              border: 'none',
              borderRadius: '7px',
              padding: '11px 20px',
              cursor: 'pointer',
            }}
          >
            Save Event
          </button>
        </form>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: '14px 8px' }}>Event Name</th>
              <th style={{ padding: '14px 8px' }}>Date</th>
              <th style={{ padding: '14px 8px' }}>Time</th>
              <th style={{ padding: '14px 8px' }}>Venue</th>
              <th style={{ padding: '14px 8px' }}>Status</th>
              <th style={{ padding: '14px 8px' }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td style={{ padding: '14px 8px', borderTop: '1px solid #e5e7eb' }}>
                  {event.name}
                </td>

                <td style={{ padding: '14px 8px', borderTop: '1px solid #e5e7eb' }}>
                  {formatDate(event.date)}
                </td>

                <td style={{ padding: '14px 8px', borderTop: '1px solid #e5e7eb' }}>
                  {event.time}
                </td>

                <td style={{ padding: '14px 8px', borderTop: '1px solid #e5e7eb' }}>
                  {event.venue}
                </td>

                <td style={{ padding: '14px 8px', borderTop: '1px solid #e5e7eb' }}>
                  {event.status}
                </td>

                <td style={{ padding: '14px 8px', borderTop: '1px solid #e5e7eb' }}>
  <button
    type="button"
    onClick={() => deleteEvent(event.id)}
    style={{
      background: '#dc2626',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '8px 12px',
      cursor: 'pointer',
    }}
  >
    Delete
  </button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ color: '#64748b', fontSize: '12px', marginTop: '16px' }}>
        Total events: {events.length}
      </p>
    </section>
  )
}

export default Events