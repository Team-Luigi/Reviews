const model = require('../model');

module.exports = {
  get: async function(req, res) {
    const params = [req.params.id]; //req.query.page, req.query.count

    const reviews = await model.get(params, function(err, results) {});
    const rows = reviews.rows;
      if (rows[0] === undefined) {
        res.send(rows);
        return;
      }
      let resultsObj = {
        product: rows[0]["product_id"],
        page: 0,
        count: 0,
        results: []
      };
      for (let i = 0; i < rows.length; i++) {
        let currentReview = rows[i];
        let currentId = currentReview.id;
        let transformedReview = {
          review_id: rows[i].id,
          rating: rows[i].rating,
          summary: rows[i].summary,
          recommend: rows[i].recommend,
          response: rows[i].response,
          body: rows[i].body,
          date: rows[i].date,
          reviewer_name: rows[i].reviewer_name,
          helpfulness: rows[i].helpfulness,
          photos: []
        }
        resultsObj.results.push(transformedReview);
      }
      // console.log('reviews', resultsObj);
      for (let i = 0; i < resultsObj.results.length; i++) {
        let photoParams = [resultsObj.results[i]["review_id"]];
        let photos = await model.getPhotos(photoParams, function (err, photoResults) {});
        // console.log('photos', photos);
        if (photos.rows !== undefined && photos.rows.length > 0) {
          for (let j = 0; j < photos.rows.length; j++) {
            if (resultsObj.results[i]["review_id"] === photos.rows[j]["review_id"]) {
              resultsObj.results[i].photos.push(photos.rows[j].url);
            }
          }
        }
      }
    res.send(resultsObj);
  },

  getMeta: function(req, res) {
    const params = [req.params.id]; //req.query.page, req.query.count
    model.getMeta(params, function(err, results) {
      if (err) {
        console.log('getmeta error', err);
        res.sendStatus(500);
      } else {
        res.send(results);
      }
    });
  },

  post: function(req, res) {
    model.post(function(err, results) {
      if (err) {
        console.log('post err', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  }
}