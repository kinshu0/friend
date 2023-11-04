import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import axios from 'axios';

function AudioRecord() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState('');

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = (recordedData) => {
    console.log('chunk of real-time data is: ', recordedData);
    console.log("record on data")
    console.log({recordedData})
    setAudioData(recordedData);
  //   const audioBlob = new Blob([recordedData], { type: 'audio/wav' }); // You can adjust the type according to your audio format
  // setAudioData(audioBlob);
  };

  const onStop = () => {
    console.log("record stopped")
    // Handle the recorded audio data here (audioData).
  };
  console.log({audioData},"")

  const sendAudioToBackend = async () => {
    try {
      const response = await axios.post('http://localhost:3001/upload-audio', { audioData });
      console.log('Audio sent to the backend:', response.data);
    } catch (error) {
      console.error('Error sending audio to the backend:', error);
    }
  };

  const handleUpload = () => {
    if (audioData) {
      const formData = new FormData();
      formData.append('audio', audioData);

      fetch('http://localhost:3001/upload-audio', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Audio uploaded:', data);
        })
        .catch((error) => {
          console.error('Error uploading audio:', error);
        });
    }
  };


  
  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <button onClick={handleUpload}>Send to Backend</button>
      <ReactMic
        record={isRecording}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
      />
    </div>
  );
}

export default AudioRecord;
