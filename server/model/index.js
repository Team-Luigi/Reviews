const db = require('/home/joe/hackreactor/Reviews/database');
// 'select r.id, r.product_id, r.rating, to_timestamp(r.date), r.summary, r.body, r.recommend, reported, r.reviewer_name, r.reviewer_email, r.response, r.helpfulness, p.review_id as photo_review_id, p.url from reviews r, photos p where r.product_id = $1 and ((r.id = p.review_id) or p.review_id is null);';

 // 'select * from reviews r, photos p where r.product_id = $1 and r.id = p.review_id';
module.exports = {

  get: function(params, callback) {
    // console.log('model params', params);
    const query = 'select * from reviews r where r.product_id = $1 order by r.id asc';

    db.query(query, params, function(err, results) {
      callback(err, results);
    });
  },

  getPhotos: function(params, callback) {
    // console.log('model params', params);
    const query = 'select * from photos p where p.review_id = $1';

    db.query(query, params, function(err, results) {
      callback(err, results);
    });
  },

  getMeta: function(callback) {
    const query = '';
    db.query(query, function(err, results) {
      callback(err, results);
    });
  },

  post: function(params, callback) {
    const query = '';
    db.query(query, params, function(err, results) {
      callback(err, results);
    });
  }
}


// const query = 'select r.id, r.product_id, r.rating, to_timestamp(r.date) as date, r.summary, r.body, r.recommend, reported, r.reviewer_name, r.reviewer_email, r.response, r.helpfulness, p.review_id as photo_review_id, p.url from reviews r left join photos p on (r.id = p.review_id) where r.product_id = $1';