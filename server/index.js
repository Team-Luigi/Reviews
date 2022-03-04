const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));

app.get()

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});