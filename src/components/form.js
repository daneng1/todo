import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Loader from './loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import useForm from '../hooks/formHook.js';
import { SiteContext } from '../context/site.js';
import './form.scss';

export default function TodoForm(props) {
  const context = useContext(SiteContext);
  const [item, setItem] = useState({});
  const [handleSubmit,handleChange] = useForm(submit);

  function submit(item) {
    props.addItem(item);
    const newItem = {};
    setItem(newItem);
  }

  function toggleLoading() {
    context.setLoading(true);
    setTimeout(() =>{
      context.setLoading(false);
    }, 1500)
  }

  return (
    <section className="form-section">
      <h3>Add Item</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail"
          type="text">
          <Form.Label className="mt-3">To Do List Item</Form.Label>
          <Form.Control
            name="text"
            onChange={handleChange}
            placeholder="To Do List Item" />
        </Form.Group>
        <Form.Group
          controlId="formBasicPassword">
          <Form.Label className="mt-4">Assign To</Form.Label>
          <Form.Control
            type="text"
            name="assignee"
            placeholder="Assign To"
            onChange={handleChange} />
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
            onChange={handleChange} 
            style={{ width: '200px' }}/>
          <span className="font-weight-normal indigo-text ml-2 mt-0">5</span>
        </Form.Group>
        <Button onClick={toggleLoading} style={{ width: '100px' }}className="mt-4" aria-controls="example-fade-text" variant="primary" type="submit">
          Add Item
        </Button>
        <Loader/>
      </Form>
    </section>
  );
}
