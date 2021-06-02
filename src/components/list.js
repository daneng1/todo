import React, { useState, useEffect } from 'react';
import { If, Then, Else, When, Unless } from 'react-if';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl } from 'react-bootstrap';
import useForm from '../hooks/formHook.js';

export default function TodoList(props) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [value, setValue] = useState('');
  const [handleSubmit, values] = useForm(todoList);
  
  const toggleField = (id) => {
    setOpen(!open);
    console.log(id);
    setId(id);
  }
  useEffect(() => {
    console.log(value);
  })

  function todoList(todo) {
    setValue(todo);
    props.updateItem(id, value)
  }

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
            <Button size="sm" variant="outline-danger" onClick={() => props.deleteItem(item._id)}>X</Button>

          </ListGroup>
        ))}
      </Card>
      <When condition={open === true}>
        <Form className="mt-3" >
          <FormControl placeholder="update a task text" onChange={(e) => setValue(e.target.value)} />
          <Button onClick={(e) => {handleSubmit(e); toggleField(id);}}>Submit</Button>
        </Form>
      </When>
    </>
  );

}
