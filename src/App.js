import React, {useState, useEffect} from 'react';
import './App.css';
import Task from './Task';

function App() {
  return (
    <div className="App">
      <div className="flex-container" id="todo-wrapper">
          <h1 className="flex-item" id="todo-header">
              Todo
          </h1>
          <div className="flex-item" id="todo-input">
              <form>
              <label><input type="text" placeholder="add your task"></input></label>
              </form>
          </div>
          <div className="flex-item" id="todo-list">
              <p>task1</p>
              <p>task2</p>
              <Task/>
          </div>
      </div>
    </div>
  );
}

export default App;
