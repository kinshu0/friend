import React from 'react';
import './App.css'; // Import your CSS file
import Textbox from '../components/Textbox';
import 'bootstrap/dist/css/bootstrap.min.css';
import AudioRecord from './AudioRecord';
import Dictaphone from './Dictaphone';

const App = () => {

  const [record,setRecord] = React.useState(false)
  return (
    <div className="App">
      <div className="image-container">
        <h1>Buddy.ai</h1>
        <img src="src/assets/teacher.jpg" alt="Teacher" />
      </div>
      <Textbox className = "center-text" />
      {/* <AudioRecord /> */}
      <Dictaphone record={record}/>
      <button type="button" className="btn btn-secondary" onClick={() => setRecord(!record)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic" viewBox="0 0 16 16">
            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"></path>
            <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"></path>
          </svg>
        </button>
    </div>
  );
};

export default App;
