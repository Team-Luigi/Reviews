const model = require('../model');

module.exports = {

  get: function(req, res) {
    const params = [req.params.id];
    model.getReviews(params, function(err, results) {
      if (err) {
        console.log(results);
        res.sendStatus(500);
      } else {
        let resultObj = {}
        res.send(results);
      }
    });
  },
  get: async function(req, res) {
    const params = [req.params.id]; //req.query.page, req.query.count

    const reviews = await model.getReviews(params, function(err, results) {});
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

  getMeta: async function(req, res) {
    let params = [req.params.id]; //req.query.page, req.query.count
    const characteristics = await model.getMeta(params, function(err, results) {});


    //RATINGS
    let ratingsObject = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };
    for (let i = 1; i <= 5; i++ ) {
      params[1] = i;
      const getRatings = await model.getRating(params, function(err, results) {});
      ratingsObject[i] = getRatings.rows[0].count;
    }


    //RECOMMENDED
    let recommendedObject = {
      false: 0,
      true: 0
    };
    params = [req.params.id];
    const getRecommended = await model.getRecommended(params);
    for (let i = 0; i < getRecommended.rows.length; i++) {
      if (getRecommended.rows[i].recommend === false) {
        recommendedObject.false = getRecommended.rows[i].count;
      } else if (getRecommended.rows[i].recommend === true) {
        recommendedObject.true = getRecommended.rows[i].count;
      }
    }


    //CHARACTERISTICS
    let characteristicSum = {
      fit: 0,
      length: 0,
      comfort: 0,
      quality: 0,
      fitId: 0,
      lengthId: 0,
      comfortId: 0,
      qualityId: 0
    };

    const reviews = await model.getReviews(params, function(err, results) {});
    let reviewsCount = reviews.rows.length;
    for (let i = 0; i < reviews.rows.length; i++) {
      let reviewParams = [reviews.rows[i].id];
      const getCharReviews = await model.getCharReviews(reviewParams);
      for (let j = 0; j < getCharReviews.rows.length; j++) {
        if (getCharReviews.rows[j].name === 'Fit') {
          characteristicSum.fit += getCharReviews.rows[j].value;
          characteristicSum.fitId = getCharReviews.rows[j]["characteristic_id"];
        }
        if (getCharReviews.rows[j].name === 'Length') {
          characteristicSum.length += getCharReviews.rows[j].value;
          characteristicSum.lengthId = getCharReviews.rows[j]["characteristic_id"];
        }
        if (getCharReviews.rows[j].name === 'Comfort') {
          characteristicSum.comfort += getCharReviews.rows[j].value;
          characteristicSum.comfortId = getCharReviews.rows[j]["characteristic_id"];
        }
        if (getCharReviews.rows[j].name === 'Quality') {
          characteristicSum.quality += getCharReviews.rows[j].value;
          characteristicSum.qualityId = getCharReviews.rows[j]["characteristic_id"];
        }
      }
    }

    let characteristicsObject = {
      Fit: {
        id: characteristicSum.fitId,
        value: (characteristicSum.fit / reviewsCount)
      },
      Length: {
        id: characteristicSum.lengthId,
        value: (characteristicSum.length / reviewsCount)
      },
      Comfort: {
        id: characteristicSum.comfortId,
        value: (characteristicSum.comfort / reviewsCount)
      },
      Quality: {
        id: characteristicSum.qualityId,
        value: (characteristicSum.quality / reviewsCount)
      },
    }

    //FINAL RESULTS OBJECT
    let resultsObj = {
      product_id: params[0],
      ratings: ratingsObject,
      recommended: recommendedObject,
      characteristics: characteristicsObject
    }
    res.send(resultsObj);
  },

  post: async function(req, res) {
    // console.log('req', req.body);
    const lastId = await model.getLastReviewId();
    console.log(lastId);
    let params = [(lastId.rows[0].id + 1), req.body["product_id"], req.body.rating, (new Date().getTime()), req.body.summary, req.body.body, req.body.recommend, false, req.body["reviewer_name"], req.body["reviewer_email"], null, 0];

    model.saveReview(params, function(err, results) {
      if (err) {
        console.log('post err', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  },

  putHelpful: function(req, res) {
    const params = [req.params.review_id];
    model.markHelpful(params, function(err, results) {
      if (err) {
        console.log(err);
      } else {
        res.sendStatus(204);
      }
    });
  },

  putReport: function(req, res) {
    const params = [req.params.review_id];
    // console.log(params);
    model.markReported(params, function(err, results) {
      if (err) {
        console.log(err);
      } else {
        res.sendStatus(204);
      }
    });
  }
}