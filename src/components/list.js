import React, { useState, useEffect, useContext } from 'react';
import { SiteContext } from '../context/site.js';
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
  const [goToNextPage, goToPreviousPage, changePage, getPaginatedData, getPaginationGroup] = usePagination();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleField = (id) => {
    setOpen(!open);
    setId(id);
  }

  function todoList(todo) {
    setValue(todo);
    props.updateItem(id, value)
  }
  console.log('show', show);

  return (
    <div>
      {getPaginatedData(context.list).map((item) => (
        <div>

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
          <Button variant="primary"onClick={() => { handleShow(); toggleField(item._id) }}>Update Item</Button>
        </Modal.Footer>
      </Modal.Dialog>
        </div>
      ))}

        <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form className="mt-3 m-2" onSubmit={(e) => { handleSubmit(e); toggleField(id); }}>
            <FormControl placeholder="update a task text" onChange={(e) => setValue(e.target.value)} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={(e) => { handleSubmit(e); toggleField(id); handleClose()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );

}
