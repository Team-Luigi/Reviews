const express = require('express');
const axios = require('axios');
const path = require('path');
const controller = require('./controller');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));

app.get('/api/reviews/:id/', controller.get);

app.get('/api/reviews/meta/:id/', controller.getMeta);

app.post('/api/reviews', controller.post);

app.put('/api/reviews/:review_id/helpful', controller.putHelpful);

app.put('/api/reviews/:review_id/report', controller.putReport);


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;