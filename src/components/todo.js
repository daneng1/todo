import React, { useState, useEffect } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import uuid from 'react-uuid';
import Navbar from 'react-bootstrap/Navbar';
import './todo.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import './todo.scss';

function ToDo() {
  const [list, setList] = useState([]);

  const _addItem = (item) => {
    item._id = uuid();
    item.complete = false;
    setList([...list, item]);
  };

  const toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let newList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(newList);
    }

  };

  const updateItem = (id, val) => {
    let item = list.filter(i => i._id === id)[0] || {};

    console.log(val);
    if (item._id) {
      item.text = val;
      let newList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(newList);
    }
  }

  const deleteItem = id => {
    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      let newList = list.filter(listItem => listItem._id !== id);
      setList(newList);
    }
  }

  useEffect(() => {

    let newList = [
      { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A' },
      { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A' },
      { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B' },
      { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C' },
      { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B' },
    ];

    setList(newList);
  }, [])

  useEffect(() => {
    const itemsToDo = list.filter(item => !item.complete).length;
    document.title = `${itemsToDo} item(s) to complete`
  })

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className="brand" href="#home">React To Do List</Navbar.Brand>
        
      </Navbar>
      <header>
        <h6 className="counter-Header">
          There are {list.filter(item => !item.complete).length} Items To Complete
          </h6>
      </header>

      <section className="todo">

        <div>
          <TodoForm addItem={_addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            toggleComplete={toggleComplete}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
        </div>
      </section>
    </>
  );

}

export default ToDo;
