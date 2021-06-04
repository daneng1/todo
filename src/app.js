import React from 'react';
import SiteContext from './context/site.js';
import ToDo from './components/todo.js';

export default class App extends React.Component {
  render() {
    return (
      <SiteContext>
        <ToDo />
      </SiteContext>
    );
  }
}
