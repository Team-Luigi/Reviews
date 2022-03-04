const db = require('/home/joe/hackreactor/Reviews/database');

module.exports = {

  get: function(callback) {
    console.log('hello from model')
    const query = 'select * from reviews limit 1';
    db.query(query, function(err, results) {
      console.log(query);
      callback(err, results);
    });
  }
}