import React, { useState, useEffect } from 'react';
import { If, Then, Else, When, Unless } from 'react-if';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl } from 'react-bootstrap';

export default function TodoList(props) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [value, setValue] = useState('');

  const toggleField = (id) => {
    setOpen(!open);
    console.log(id);
    setId(id);
  }
  useEffect(() => {
    console.log(value);
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    // e.target.reset();
    console.log(value);
    props.updateItem(id, value);
    toggleField();
  };

  return (
    <>
      <Card style={{ width: '60vw' }}>
          {props.list.map(item => (
        <ListGroup horizontal className="m-1" key={item._id}>
            
              <ListGroup.Item action variant={item.complete ? "danger" : "success"}
                className={`complete-${item.complete.toString()}`}
                
                onClick={() => props.toggleComplete(item._id)}>
                  Task: {item.text}, Assigned to: {item.assignee}, Difficulty: {item.difficulty}
              </ListGroup.Item>
              <Button onClick={() => toggleField(item._id)}>Update Item</Button>
              <Button  size="sm" variant="outline-danger" onClick={() => props.deleteItem(item._id)}>X</Button>
            
        </ListGroup>
          ))}
      </Card>
      {/* <ul>
        {props.list.map(item => (
          <li
            className={`complete-${item.complete.toString()}`}
            key={item._id}
          >
            <span onClick={() => props.toggleComplete(item._id)}>
              Task: {item.text},  Assigned to: {item.assignee},  Difficulty: {item.difficulty}
            </span>
            <Button onClick={() => toggleField(item._id)}>Update Item</Button>
            <Button onClick={() => props.deleteItem(item._id)}>X</Button>
          </li>
        ))}
      </ul> */}
      <When condition={open === true}>
        <Form className="mt-3" >
          <FormControl placeholder="update a task text" onChange={(e) => setValue(e.target.value)}/>
          <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
        </Form>
      </When>
    </>
  );

}
