const express = require('express');
const axios = require('axios');
const path = require('path');
const controller = require('./controller');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));

app.get('/api/reviews/:id/', controller.get);

app.get('/api/reviews/meta', controller.getMeta);

app.post('/api/reviews', controller.post);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});