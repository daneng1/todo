import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function TodoForm(props) {
  const [item, setItem] = useState({})

  const handleInputChange = e => {
    console.log([e.target.name], e.target.value);
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    console.log(item);
    if(!item['difficulty']) {
      setItem({ ...item, 'difficulty': 1 })
    }
    console.log(item);
    props.addItem(item);
    const newItem = {};
    setItem(newItem);
  };


  return (
    <>
      <h3>Add Item</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail"
          type="text">
          <Form.Label className="mt-3">To Do List Item</Form.Label>
          <Form.Control
            name="text"
            onChange={handleInputChange}
            placeholder="To Do List Item" />
        </Form.Group>

        <Form.Group
          controlId="formBasicRange">
          <Form.Label className="mt-4">Difficulty</Form.Label>
          <span className="font-weight-normal indigo-text mr-2 mt-0">1</span>
          <Form.Control
            defaultValue="1"
            type="range"
            min="1"
            max="5"
            name="difficulty"
            onChange={handleInputChange} />
          <span className="font-weight-normal indigo-text ml-2 mt-0">5</span>
        </Form.Group>
        <Form.Group
          controlId="formBasicPassword">
          <Form.Label className="mt-4">Assign To</Form.Label>
          <Form.Control
            type="text"
            name="assignee"
            placeholder="Assign To"
            onChange={handleInputChange} />
        </Form.Group>
        <Button className="mt-2" aria-controls="example-fade-text" variant="primary" type="submit">
          Add Item
        </Button>
      </Form>
    </>
  );
}
