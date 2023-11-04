const AssemblyAI = require('assemblyai').AssemblyAI;


const client = new AssemblyAI({
    apiKey: '6d7842eeec5846d9b517258e9744a816',
  });

  const FILE_URL = 'uploads/audio_1699119200351.mp3'
//   const FILE_URL = 'a1.webm'
//   'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3';

// You can also transcribe a local file by passing in a file path
// const FILE_URL = './path/to/file.mp3';

// Request parameters 
const data = {
  audio_url: FILE_URL
}

const run = async () => {
    const transcript = await client.transcripts.create(data);
    console.log(transcript.text);
  };

  run()