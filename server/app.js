const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const service = require('./service');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create


// read
app.get('/posts', (req, res) => {
  res.json({ success: true });
})


// update



// delete

app.listen(process.env.PORT, () => {
  console.log('Server is running on port 5000')
})
