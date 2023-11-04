import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = ({record,setListening,setResponses,selectedCharacter}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();


  

  useEffect(() => {
    setListening(listening)
  },[listening])

  const sendTranscriptToApi = (transcript,character_name) => {
    axios.post('http://127.0.0.1:8000/talk',{message:transcript,character_name:character_name})
    .then(res => {
      console.log({res});
      setResponses( responses => [...responses, res.data.message])
    })
    .catch(err => {
      console.log({err})
    })
  }

  useEffect(() => {
    if(record){
      SpeechRecognition.startListening({
        continuous: true,
      })
    }else{
      SpeechRecognition.stopListening()
      if(transcript){
        sendTranscriptToApi(transcript,selectedCharacter);
      }
      resetTranscript()
      
    }

  },[record])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }
  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      {/* <button onClick={SpeechRecognition.startListening({
  continuous: true,
})}>Start</button> */}
      {/* <button onClick={SpeechRecognition.stopListening}>Stop</button> */}
      {/* <button onClick={resetTranscript}>Reset</button> */}
      {/* <p style={{maxWidth:'400px'}}>{transcript}</p> */}
    </div>
  );
};
export default Dictaphone;
