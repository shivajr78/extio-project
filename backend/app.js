const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/roles', require('./routes/roles'));
app.use('/api/users', require('./routes/users'));
app.use('/api', require('./routes/auth'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
