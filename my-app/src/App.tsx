import './App.css';
import React from 'react';
import TaskList from './TaskList.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header" >
        <TaskList/>
      </header>
    </div>
  );
}
export default App;
