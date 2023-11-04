const express = require("express");
const PORT = process.env.PORT || 3001;
const path = require('path');
const app = express();
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const bodyParser = require('body-parser'); // Add the body-parser middleware

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false })); // Use body-parser to parse the request body
// app.use(bodyParser.json());

const customFileName = () => {
  const timestamp = Date.now();
  return `audio_${timestamp}.mp3`;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, customFileName());
  },
});
const upload = multer({ storage });

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload-audio', upload.single('audio'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  console.log(req.file,'req.file')
  const { originalname, size, path } = req.file;

  // Perform additional processing if needed (e.g., convert to a different format)

  res.json({ message: 'Audio file uploaded', filename: originalname, size, path });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
