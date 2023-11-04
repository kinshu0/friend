const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const cors = require('cors');
app.use(cors());

const multer = require('multer');
const fs = require('fs');
const { exec } = require('child_process');

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload-audio', upload.single('audio'), (req, res) => {
    // Handle uploaded audio here
    console.log({req,res})
    const audioData = req.file.buffer; // Binary audio data
    console.log("audio received");
    // Save the audio data as an MP3 file using ffmpeg
    const mp3FilePath = 'path-to-save-audio.mp3';
  
    fs.writeFileSync(mp3FilePath, audioData);
  
    // Send a response or do further processing
  
    res.status(200).json({ message: 'Audio recorded and saved as MP3.' });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});