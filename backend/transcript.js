const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs');
const { exec } = require('child_process');
const router = require('express').Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route('/add').post(upload.single('audio'), (req, res) => {
  // Handle uploaded audio here
  const audioData = req.file.buffer; // Binary audio data

  // Save the audio data as an MP3 file using ffmpeg
  const mp3FilePath = 'path-to-save-audio.mp3';

  fs.writeFileSync(mp3FilePath, audioData);

  // Send a response or do further processing

  res.status(200).json({ message: 'Audio recorded and saved as MP3.' });
});

