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
app.post('/new', (req, res) => {
  const { title, review, rating } = req.body;
  const db = service.getServiceInstance();

  const result = db.insertPost(title, review, rating);

  result.then(data => res.json({ success: true }))
  .catch(err => console.log(err));
  
});


// read
app.get('/posts', (req, res) => {
  const db = service.getServiceInstance(); 

  const result = db.getPosts();

  result
  .then(data => res.json({data: data}))
  .catch(err => console.log(err));

})


// update



// delete

app.listen(process.env.PORT, () => {
  console.log('Server is running on port 5000')
})
