import React, { useState, useEffect, useContext } from 'react';
import { SiteContext } from '../context/site.js';
import { When } from 'react-if';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl } from 'react-bootstrap';
import useForm from '../hooks/formHook.js';
import './list.scss';
import usePagination from '../hooks/paginationHook.js';

export default function TodoList(props) {
  const context = useContext(SiteContext);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [value, setValue] = useState('');
  const [handleSubmit] = useForm(todoList);
  const [ getPaginatedData ] = usePagination();
  const [show, setShow] = useState(false);


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
    <div>
      {getPaginatedData(context.list).map((item) => (
      <Modal.Dialog style={{ width: '40vw' }} key={item._id} className="m-2 shadow">
        <Modal.Header >
          <Button style={{ width: '80px', fontSize: '10px', borderRadius: '20px' }} action onClick={() => props.toggleComplete(item._id)} variant={item.completed ? "danger" : "success"} className={`complete-${item.completed.toString()}`}>{item.completed.toString() === "true" ? "Complete" : "Pending"}</Button>
          <Modal.Title className="ml-0">{item.assignee}</Modal.Title>
          <Button variant="none"onClick={() => props.deleteItem(item._id)}>❌</Button>
        </Modal.Header>

        <Modal.Body>
          <p>{item.text}</p>
          <p className="">Difficulty: {item.difficulty}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary"onClick={() => { handleShow; toggleField(item._id) }}>Update Item</Button>
        </Modal.Footer>
      </Modal.Dialog>
      // <CardDeck>
        
      //     <Card className="m-2" style={{ width: '30vw' }} key={item._id}>
      //       <Card.Header horizontal >
      //         <Button action onClick={() => props.toggleComplete(item._id)} variant={item.complete ? "danger" : "success"}
      //           className={`complete-${item.complete.toString()}`}>Status</Button>
      //         <Card.Title>{item.assignee}</Card.Title>
      //         <Button closeButton onClick={() => props.deleteItem(item._id)}>X</Button>

      //       </Card.Header>
      //       <Card.Body>
      //         <Card.Text>
      //           {item.text}
      //         </Card.Text>
      //         <Card.Text>
      //           Difficulty: {item.difficulty}
      //         </Card.Text>
      //         <Button onClick={() => { handleShow; toggleField(item._id) }}>Update Item</Button>
      //       </Card.Body>

      //     </Card>
        ))}
        <When condition={open === true}>
          <Form className="mt-3" onSubmit={(e) => { handleSubmit(e); toggleField(id); }}>
            <FormControl placeholder="update a task text" onChange={(e) => setValue(e.target.value)} />
            <Button type="submit" >Submit</Button>
          </Form>
        </When>
      {/* </CardDeck> */}
    </div>
  );

}
