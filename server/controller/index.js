const model = require('../model');

module.exports = {

  get: function(req, res) {
    const params = [req.params.id]; //req.query.page, req.query.count
    model.get(params, function(err, results) {
      if (err) {
        console.log('get error', err);
        res.sendStatus(500);
      } else {
        const rows = results.rows;
        // console.log(results);
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
              reviewer_email: rows[i].reviewer_email,
              helpfulness: rows[i].helpfulness,
              photos: []
          }
          resultsObj.results.push(transformedReview);
        }
        res.send(resultsObj);
      }
    })
  },


   // for (let i = 0; i < resultsObj.results.length; i++) {
        //   let photoParams = [resultsObj.results[i]["review_id"]];
        //   // resultsObj.results[i].photos.push
        //   console.log(model.getPhotos(photoParams, function (err, photoResults) {
        //     if (err) {
        //       console.log(err);
        //     } else {
        //       if (photoResults.rows !== undefined && photoResults.rows.length > 0) {
        //         let reviewPhotos = [];
        //         for (let j = 0; j < photoResults.rows.length; j++) {
        //           reviewPhotos.push(photoResults.rows[j].url);
        //         }
        //         console.log(reviewPhotos)
        //         return reviewPhotos;
        //       }
        //     }

        //     // console.log('getphotos', resultsObj)
        //   }));
        //   // console.log('loop', resultsObj);
        // }
        // console.log('end:', resultsObj);
// idea to return promise of inner function then push into resultsObj.results[i].photos
  getMeta: function(req, res) {
    model.getMeta(function(err, results) {
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