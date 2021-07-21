import React, { useState, useContext } from "react";

import { SiteContext } from "../context/site.js";
import UpdateItemModal from './modal.js';
import usePagination from "../hooks/paginationHook.js";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./list.scss";

export default function TodoList(props) {
  const context = useContext(SiteContext);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [
    goToNextPage,
    goToPreviousPage,
    changePage,
    getPaginatedData,
    getPaginationGroup,
  ] = usePagination();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleField = (id) => {
    setOpen(!open);
    setId(id);
  };

  let list = context.list;
  let filteredList = list;

  function filtered(val) {
    setFilter(val);
    if (filter === "complete") {
      filteredList = list.filter((item) => item.completed === "complete");
    } else if (filter === "pending") {
      filteredList = list.filter((item) => item.completed === "pending");
    } else if (filter === "in-progress") {
      filteredList = list.filter((item) => item.completed === "in-progress");
    } else if (filter === "all") {
      filteredList = context.list;
    }
  }

  function status(val) {
    if (val === "pending") {
      return "success";
    } else if (val === "in-progress") {
      return "warning";
    } else if (val === "complete") {
      return "danger";
    }
  }

  if (context.sortSelected === "name") {
    filteredList.sort((a, b) => {
      if (a.assignee.toLowerCase() > b.assignee.toLowerCase()) return 1;
      if (a.assignee.toLowerCase() < b.assignee.toLowerCase()) return -1;
      return 0;
    });
  } else if (context.sortSelected === "difficulty") {
    filteredList.sort((a, b) => {
      if (a.difficulty > b.difficulty) return 1;
      if (a.difficulty < b.difficulty) return -1;
      return 0;
    });
  } else if (context.sortSelected === "task") {
    filteredList = filteredList.sort((a, b) => {
      if (a.text.toLowerCase() > b.text.toLowerCase()) return 1;
      if (a.text.toLowerCase() < b.text.toLowerCase()) return -1;
      return 0;
    });
  }

  return (
    <div>
      <h3>Sort Tasks</h3>
      <select onChange={(e) => context.setSortSelected(e.target.value)}>
        <option></option>
        <option value="name">Name</option>
        <option value="difficulty">Difficulty</option>
        <option value="task">Task</option>
      </select>
      <select onChange={(e) => filtered(e.target.value)}>
        <option value="all">All</option>
        <option value="complete">Complete</option>
        <option value="in-progress">In-progress</option>
        <option value="pending">Pending</option>
      </select>
      {getPaginatedData(filteredList).map((item) => (
        <div>
          <Modal.Dialog
            style={{ width: "40vw" }}
            key={item._id}
            className="m-2 shadow"
          >
            <Modal.Header>
              <Button
                style={{
                  width: "85px",
                  fontSize: "10px",
                  borderRadius: "20px",
                }}
                action
                onClick={() => props.toggleComplete(item._id)}
                variant={status(item.completed)}
                className={`complete-${item.completed}`}
              >
                {item.completed}
              </Button>
              <Modal.Title className="ml-0">{item.assignee}</Modal.Title>
              <Button variant="none" onClick={() => props.deleteItem(item._id)}>
                ❌
              </Button>
            </Modal.Header>
            <Modal.Body>
              <p>{item.text}</p>
              <p className="">Difficulty: {item.difficulty}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => {
                  handleShow();
                  toggleField(item._id);
                }}
              >
                Update Item
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
          <UpdateItemModal
            show={show} onHide={handleClose} updateItem={props.updateItem} id={id} setOpen={setOpen}
          />
        </div>
      ))}
    </div>
  );
}
