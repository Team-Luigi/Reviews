const db = require('/home/joe/hackreactor/Reviews/database');
// 'select r.id, r.product_id, r.rating, to_timestamp(r.date), r.summary, r.body, r.recommend, reported, r.reviewer_name, r.reviewer_email, r.response, r.helpfulness, p.review_id as photo_review_id, p.url from reviews r, photos p where r.product_id = $1 and ((r.id = p.review_id) or p.review_id is null);';

 // 'select * from reviews r, photos p where r.product_id = $1 and r.id = p.review_id';
module.exports = {

  getReviews: function(params) {
    return new Promise((resolve, reject) => {
      const query = 'select r.id, r.product_id, r.rating, to_timestamp(r.date) as date, r.summary, r.body, r.recommend, reported, r.reviewer_name, r.response, r.helpfulness from reviews r where r.product_id = $1 order by r.id asc';

      db.query(query, params, function(err, results) {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(results);
      });
    });
  },

  getPhotos: function(params) {
    return new Promise((resolve, reject) => {
      const query = 'select * from photos p where p.review_id = $1';
      db.query(query, params, function(err, results) {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(results);
      });
    });
  },

  getMeta: function(params) {
    return new Promise((resolve, reject) => {
      const query = 'select * from characteristics c where c.product_id = $1';
      db.query(query, params, function(err, results) {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(results);
      });
    });
  },

  getRating: function(params) {
    return new Promise((resolve, reject) => {
      const query = 'select count(*) from reviews r where r.product_id =  $1 and r.rating = $2';
      db.query(query, params, function(err, results) {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(results);
      });
    });
  },

  getRecommended: function(params) {
    return new Promise((resolve, reject) => {
      const query = 'select r.recommend, count(*) from reviews r where r.product_id = $1 group by r.recommend';
      db.query(query, params, function(err, results) {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(results);
      });
    });
  },

  getCharReviews: function(params) {
    return new Promise((resolve, reject) => {
      const query = 'select cr.review_id, cr.characteristic_id, cr.value, c.name from characteristics_reviews cr, characteristics c where cr.characteristic_id = c.id and cr.review_id = $1';
      db.query(query, params, function(err, results) {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(results);
      });
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