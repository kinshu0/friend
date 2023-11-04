import React, { useState, useEffect } from 'react';
import './App.css';
import Textbox from '../components/Textbox';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dictaphone from './Dictaphone';
import axios from 'axios';

// Update the API endpoint to match your Flask server URL
const API_ENDPOINT = 'http://127.0.0.1:8000';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState('');

  const [responses, setResponses] = useState([]);
  const [text, setText] = useState('');

  const [record,setRecord] = React.useState(false)
  const [listening,setListening] = React.useState(false)
  
  console.log({listening})
  useEffect(() => {
    // Fetch the list of characters from the backend API
    fetch(`${API_ENDPOINT}/characters`)
      .then((response) => response.json())
      .then((data) => {
        // Extract the character names from the response object
        const characterNames = Object.keys(data);
        setCharacters(characterNames);
      })
      .catch((error) => console.error('Error fetching characters:', error));
  }, []);

  console.log({responses})
  const talk = (text,selectedCharacter) => {
    axios.post(`${API_ENDPOINT}/talk`,{
      character_name: selectedCharacter,
      message: text
    })
    // fetch(`${API_ENDPOINT}/talk`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     "character_name": "Jack Sparrow",
    //     "message": "hey what's going on?"
    //   })
    // })
    .then(res => {
      console.log(res);
      setResponses([...responses, res.data.message])
    })
    .catch(err => console.log({err}))
    // .then(data => setResponses([...responses, data['message']]))
  }
  

  return (
    <div className="App">
      <div className="image-container">
        <h1>Buddy.ai</h1>
        <img src="src/assets/teacher.jpg" alt="Teacher" />
      </div>
      <select
  className="character-dropdown"
  onChange={(e) => setSelectedCharacter(e.target.value)}
  value={selectedCharacter} >
  <option value="">Select a character</option>
  {characters.map((character) => (
    <option key={character} value={character}>
      {character}
    </option>
  ))}
</select>

<div className='responses'>
  {responses.map(( response,i) => {
    return <p key={i}>{response}</p>
  })}

</div>

      <Textbox className="center-text" setText={setText} text={text} />
      <button onClick={() => talk(text,selectedCharacter)}>Talk</button>
      <Dictaphone record={record} setListening={setListening} setResponses={setResponses}/>
      <button type="button" className="btn btn-secondary" onClick={() => setRecord(!record)}>
          
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={listening ? "red" : 'currentColor'} className="bi bi-mic" viewBox="0 0 16 16">
          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"></path>
          <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"></path>
        </svg>
        </button>
    </div>
  );
};

export default App;
