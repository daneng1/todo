import axios from 'axios';

const routes = (action) => {
  const api = 'https://danengel-api-server.herokuapp.com/todo';

  const getItems = (callback) => {
    axios.get(api).then(response => {
      const array = response.data;
      callback(array);
    })
  }

  const addItems = (data, callback) => {
    // console.log(`inside addItem ${data.text}`, data.assignee, data.completed, data.difficulty);
    axios({
      method: 'post',
      url: api,
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      data: data,
    }).then(response => {
      const newItem = response.data;
      callback(newItem);
    }).catch(err => console.log(err))
  }

  const deleteItems = (id, callback) => {
    axios({
      method: 'delete',
      url: `${api}/${id}`
    }).then(response => {
      callback();
    }).catch(err => console.log(err));
  }

  const updateItems = (id, data, callback) => {
    axios({
      method: 'put',
      url: `${api}/${id}`,
      data: data
    }).then(response => {
      const updatedItem = response.data;
      callback(updatedItem);
    }).catch(err => console.log(err));
  }

  return [
    getItems,
    addItems,
    deleteItems,
    updateItems
  ]
}
export default routes;
