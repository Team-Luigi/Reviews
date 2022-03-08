const db = require('/home/joe/hackreactor/Reviews/database');

module.exports = {
  //'select r.id, r.product_id, r.rating, to_timestamp(r.date) as date, r.summary, r.body, r.recommend, reported, r.reviewer_name, r.response, r.helpfulness from reviews r where r.product_id = $1 order by r.id asc'
  //select r.rating, to_timestamp(r.date) as date, r.summary, r.body, r.recommend, reported, r.reviewer_name, r.response, r.helpfulness, r.id, r.product_id, json_agg(p.url) as photos from reviews r left join photos p on r.id = p.review_id where r.id = 5 group by r.id;
  //create index concurrently review_id_on_photos on photos(review_id);
  getReviews: function(params) {
    return new Promise((resolve, reject) => {
      const query = 'select r.rating, to_timestamp(r.date) as date, r.summary, r.body, r.recommend, reported, r.reviewer_name, r.response, r.helpfulness, r.id, r.product_id, json_agg(p.url) as photos from reviews r left join photos p on r.id = p.review_id where r.id = $1 group by r.id';

      db.query(query, params, function(err, results) {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(results);
      });
    });
  },

  // getReviews: function(params, callback) {
  //   const query = 'select r.rating, to_timestamp(r.date) as date, r.summary, r.body, r.recommend, reported, r.reviewer_name, r.response, r.helpfulness, r.id, r.product_id, json_agg(p.url) as photos from reviews r left join photos p on r.id = p.review_id where r.id = $1 group by r.id';
  //   db.query(query, params, function(err, results) {
  //     callback(err, results);
  //   });
  // },

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

  getLastReviewId: function() {
    return new Promise((resolve, reject) => {
      const query = 'select r.id from reviews r order by r.id desc fetch first 1 rows only';
      db.query(query, function(err, results) {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(results);
      });
    });
  },
  //TODO: save date
  saveReview: function(params, callback) {
    const query = 'insert into reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
    db.query(query, params, function(err, results) {
      callback(err, results);
    });
  },

  markHelpful: function(params, callback) {
    const query = 'update reviews set helpfulness = helpfulness + 1 where id= $1';
    db.query(query, params, function(err, results) {
      callback(err, results);
    });
  },

  markReported: function(params, callback) {
    const query = 'update reviews set reported = true where id = $1';
    db.query(query, params, function(err, results) {
      callback(err, results);
    });
  }
}


// const query = 'select r.id, r.product_id, r.rating, to_timestamp(r.date) as date, r.summary, r.body, r.recommend, reported, r.reviewer_name, r.reviewer_email, r.response, r.helpfulness, p.review_id as photo_review_id, p.url from reviews r left join photos p on (r.id = p.review_id) where r.product_id = $1';
// 'select r.id, r.product_id, r.rating, to_timestamp(r.date), r.summary, r.body, r.recommend, reported, r.reviewer_name, r.reviewer_email, r.response, r.helpfulness, p.review_id as photo_review_id, p.url from reviews r, photos p where r.product_id = $1 and ((r.id = p.review_id) or p.review_id is null);';

 // 'select * from reviews r, photos p where r.product_id = $1 and r.id = p.review_id';


 //DELETE a row: