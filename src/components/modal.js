import React, { useState, useContext } from "react";

import { SiteContext } from "../context/site.js";
import useForm from "../hooks/formHook.js";

import { FormControl, Form, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UpdateItemModal(props) {
  const context = useContext(SiteContext);
  const [handleSubmit] = useForm(todoList);
  const [value, setValue] = useState("");

  function todoList(todo) {
    setValue(todo);
    props.updateItem(props.id, value);
  }

  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>Update Item</Modal.Title>
      </Modal.Header>
        <Form
          className="mt-3 m-2"
        >
      <Modal.Body>
          <FormControl
            placeholder="update a task"
            onChange={(e) => setValue(e.target.value)}
          />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={(e) => {
            handleSubmit(e);
            props.onHide();
          }}
          >
          Save Changes
        </Button>
      </Modal.Footer>
          </Form>
    </Modal>
  );
}
