import React from 'react';
import superagent from 'superagent';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const routes = (action) => {

  const getItems = async (e) =>{
    try{
    const raw = await superagent.get(todoAPI);
    const results = raw.body;
    return results;
    } catch (e) {
      const error = e.body;
      return error;
    }
  }

  const addItems = (e) =>{
    try{
      const raw = await superagent.put(todoAPI).send(?body);
      const results = raw.body;
      return results;
      } catch (e) {
        const error = e.body;
        return error;
      }
  }

  const deleteItems = (e) =>{
    try{
      const raw = await superagent.delete(todoAPI).send(id);
      const results = raw.body;
      return results;
      } catch (e) {
        const error = e.body;
        return error;
      }
  }

  const updateItems = (e) =>{
    try{
      const raw = await superagent.update(todoAPI).send(?body);
      const results = raw.body;
      return results;
      } catch (e) {
        const error = e.body;
        return error;
      }
  }

  return [
    getItems,
    addItems,
    deleteItems,
    updateItems
  ]
}