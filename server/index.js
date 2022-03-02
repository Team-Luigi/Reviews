const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});