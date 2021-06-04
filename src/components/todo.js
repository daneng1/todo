import React, { useState, useEffect, useContext } from 'react';
import { If, Then, Else, When, Unless } from 'react-if';
import TodoForm from './form.js';
import TodoList from './list.js';
import Pagination from './pagination.js';
import Navbar from 'react-bootstrap/Navbar';
import { SiteContext } from '../context/site.js';
import useAjax from '../hooks/ajaxHook';
import './todo.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import './todo.scss';

function ToDo() {
  // const [list, setList] = useState([]);
  const context = useContext(SiteContext);
  // const [values] = useForm(eat);
  const [getItems,addItems,deleteItems,updateItems] = useAjax();

  // function eat(food) {
  //   setList(food);
  // }

  const addItem = (item) => {
    // item._id = uuid();
    if(!item.difficulty) {
      item.difficulty = 1;
    }
    item.completed = false;
    console.log(item);
    addItems(item, newItem => context.setList([...context.list, newItem]));
  };

  const toggleComplete = id => {

    let item = context.list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.completed = !item.completed;
      updateItems(id, item , (newItem) => context.setList(context.list.map(listItem => listItem._id === item._id ? newItem : listItem)));
      // updateItems(newList);
    }

  };

  const updateItem = (id, val) => {
    let item = context.list.filter(i => i._id === id)[0] || {};

    console.log(val);
    if (item._id) {
      item.text = val;
      updateItems(id, item , (newItem) => context.setList(context.list.map(listItem => listItem._id === item._id ? newItem : listItem)));
      // setList(newList);
    }
  }

  const deleteItem = id => {
    let item = context.list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      deleteItems(id, () => context.setList(context.list.filter(listItem => listItem._id !== id)));
      // setList(newList);
    }
  }

  useEffect(() => {

    // let newList = [
    //   { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A' },
    //   { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A' },
    //   { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B' },
    //   { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C' },
    //   { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B' },
    // ];
    getItems(context.setList);
  }, [])

  useEffect(() => {
    const itemsToDo = context.list.filter(item => !item.complete).length;
    document.title = `${itemsToDo} item(s) to complete`
  })

  return (
    <>
      <Navbar bg="primary" expand="lg">
        <Navbar.Brand className="brand" href="#home">HOME</Navbar.Brand>
        
      </Navbar>
      <header>
        <h6 className="counter-Header">
          To Do List Manager ({context.list.filter(item => !item.completed).length})
          </h6>
      </header>

      <section className="todo">

        <div>
          <TodoForm 
          addItem={addItem} 
          />
        </div>

        <div>
          <TodoList
            // list={list}
            toggleComplete={toggleComplete}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
          <When condition={context.pages > 1}>
            <Pagination/>
          </When>
        </div>
      </section>
    </>
  );

}

export default ToDo;
