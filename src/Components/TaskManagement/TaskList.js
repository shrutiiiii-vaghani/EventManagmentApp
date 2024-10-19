import React, { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import Modal from 'react-modal';


const TaskList = () => {
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : [];
  });
  const [editingEvent, setEditingEvent] = useState(null); // For editing an event
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // Function to handle adding or editing an event
  // const handleAddOrEditEvent = (newEvent) => {
  //   if (editingEvent) {
  //     // Edit mode: update the event
  //     setEvents(events.map(event => (event.id === editingEvent.id ? { ...newEvent, id: editingEvent.id, completed: editingEvent.completed } : event)));
  //     setEditingEvent(null);
  //   } else {
  //     // Add new event
  //     setEvents([...events, { id: events.length + 1, ...newEvent, completed: false }]);
  //   }
  //   setModalIsOpen(false);
  // };

  const handleAddOrEditEvent = (newEvent) => {
    if (editingEvent) {
      // Edit mode: update the event
      setEvents(events.map(event => (
        event.id === editingEvent.id ? { ...newEvent, id: editingEvent.id, completed: editingEvent.completed } : event
      )));
      setEditingEvent(null);
    } else {
      // Add new event with a unique ID
      const newId = events.length ? Math.max(...events.map(event => event.id)) + 1 : 1; // Increment ID based on existing events
      setEvents([...events, { id: newId, ...newEvent, completed: false }]);
    }
    setModalIsOpen(false);
  };
  

  // Function to open modal for editing
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setModalIsOpen(true);
  };

  // Function to handle deleting an event
  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  // Filter upcoming events (future dates)
  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      height: '100vh', 
      overflow: 'hidden', 
      backgroundImage: 'url("https://images.pexels.com/photos/625644/pexels-photo-625644.jpeg")', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat' 
    }}>
      <h2 style={{ marginBottom: '20px', color: '#fff' }}>Event Management</h2>

      <button onClick={() => setModalIsOpen(true)} style={{ padding: '10px', marginBottom: '20px' }}>
        Add New Event
      </button>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <AddTaskForm onSubmitEvent={handleAddOrEditEvent} initialEvent={editingEvent || {}} />
      </Modal>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '20px', 
        width: '100%', 
        padding: '20px', 
      }}>
        {upcomingEvents.map(event => (
          <div key={event.id} style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '10px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          }}>
            <h3>{event.title} {event.completed ? "(Completed)" : ""}</h3>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Location: {event.location}</p>

            <button onClick={() => handleEditEvent(event)} style={{ marginRight: '10px' }}>Edit</button>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
