import React, { useState } from 'react';

const AddTaskForm = ({ onSubmitEvent, initialEvent = {} }) => {
  const [title, setTitle] = useState(initialEvent.title || '');
  const [description, setDescription] = useState(initialEvent.description || '');
  const [date, setDate] = useState(initialEvent.date || '');
  const [location, setLocation] = useState(initialEvent.location || '');
  const [image, setImage] = useState(initialEvent.image || '');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newEvent = {
  //     title,
  //     description,
  //     date,
  //     location,
  //     image,
  //   };
  //   onSubmitEvent(newEvent);
  //   setTitle('');
  //   setDescription('');
  //   setDate('');
  //   setLocation('');
  //   setImage(null);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      description,
      date,
      location,
      image,
    };
    onSubmitEvent(newEvent);
  
    // Reset the form fields
    setTitle('');
    setDescription('');
    setDate('');
    setLocation('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Event Title */}
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: '7px', marginBottom: '10px', display: 'block' }}
        required
      />

      {/* Event Description */}
      <textarea
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: '7px', marginBottom: '10px', display: 'block' }}
        required
      />

      {/* Event Date */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ padding: '7px', marginBottom: '10px', display: 'block' }}
        required
      />

      {/* Event Location */}
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ padding: '7px', marginBottom: '10px', display: 'block' }}
        required
      />

      {/* Event Image */}
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ padding: '7px', marginBottom: '10px', display: 'block' }}
      />

      <button type="submit" style={{ padding: '10px', fontSize: '15px', fontWeight: '600' }}>
        {initialEvent.title ? "Update Event" : "Add Event"}
      </button>
    </form>
  );
};

export default AddTaskForm;
