import React from 'react';
import './App.css'; // Import your CSS file
import Textbox from '../components/Textbox';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
      <div className="image-container">
        <img src="src/assets/teacher.jpg" alt="Teacher" />
      </div>
      <Textbox className = "center-text" />
    </div>
  );
};

export default App;
