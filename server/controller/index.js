const model = require('../model');

module.exports = {

  get: function(req, res) {
    console.log('hello from controller');
    model.get(function(err, results) {
      if (err) {
        console.log('error', err);
        res.sendStatus(500);
      } else {
        res.send(results);
      }
    });
  }
}