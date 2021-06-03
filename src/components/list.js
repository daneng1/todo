import React, { useState, useEffect } from 'react';
import { If, Then, Else, When, Unless } from 'react-if';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl } from 'react-bootstrap';
import useForm from '../hooks/formHook.js';

export default function TodoList(props) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [value, setValue] = useState('');
  const [handleSubmit, values] = useForm(todoList);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <CardDeck>
        {props.list.map(item => (
          <Card className="m-2" style={{ width: '30vw' }} key={item._id}>
            <Card.Header horizontal >
              <Button action onClick={() => props.toggleComplete(item._id)} variant={item.complete ? "danger" : "success"}
                className={`complete-${item.complete.toString()}`}>Status</Button>
              <Card.Title>{item.assignee}</Card.Title>
              <Button closeButton onClick={() => props.deleteItem(item._id)}>X</Button>

            </Card.Header>
            <Card.Body>
              <Card.Text>
                {item.text}
              </Card.Text>
              <Card.Text>
                Difficulty: {item.difficulty}
              </Card.Text>
              <Button onClick={() => {handleShow; toggleField(item._id)}}>Update Item</Button>
            </Card.Body>

            {/* <ListGroup horizontal className="m-1" key={item._id}>

            <ListGroup.Item action variant={item.complete ? "danger" : "success"}
              className={`complete-${item.complete.toString()}`}

              onClick={() => props.toggleComplete(item._id)}>
              Task: {item.text}, Assigned to: {item.assignee}, Difficulty: {item.difficulty}
            </ListGroup.Item>
            <Button onClick={() => toggleField(item._id)}>Update Item</Button>
            <Button size="sm" variant="outline-danger" onClick={() => props.deleteItem(item._id)}>X</Button>
          </ListGroup> */}
          </Card>
        ))}
      <When condition={open === true}>
        <Form className="mt-3" >
          <FormControl placeholder="update a task text" onChange={(e) => setValue(e.target.value)} />
          <Button onClick={(e) => { handleSubmit(e); toggleField(id); }}>Submit</Button>
        </Form>
      </When>
      </CardDeck>
    </>
  );

}
