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

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <button onClick={sendAudioToBackend}>Send to Backend</button>
      <ReactMic
        record={isRecording}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        mimeType="audio/mp3"
      />
    </div>
  );
}

export default AudioRecord;
