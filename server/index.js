const express = require('express');
const axios = require('axios');
const path = require('path');
const controller = require('./controller');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));

app.get('/api/reviews', controller.get);

// app.get('/api/reviews', (req, res) => {
//   res.send('hello');
// })

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});