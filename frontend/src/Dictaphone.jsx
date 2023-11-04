import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = ({record}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  console.log({record})


  const sendTranscriptToApi = () => {
    axios.post('/',{message:"transcript",character_name:''})
  }
  useEffect(() => {
    if(record){
      SpeechRecognition.startListening({
        continuous: true,
      })
    }else{
      SpeechRecognition.stopListening()
    }

  },[record])


  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      {/* <button onClick={SpeechRecognition.startListening({
  continuous: true,
})}>Start</button> */}
      {/* <button onClick={SpeechRecognition.stopListening}>Stop</button> */}
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;
