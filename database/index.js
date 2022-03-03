// const mongoose = require('mongoose');

// let photoSchema = mongoose.Schema({
//   id: Number,
//   url: String
// })

// let reviewSchema = mongoose.Schema({
//   // TODO: your schema here!
//   product_id: Number,
//   review_id: Number,
//   rating: Number,
//   summary: String,
//   recommend: Boolean,
//   body: String,
//   date: String,
//   reviewer_name: String,
//   helpfulness: Number,
//   photos: [photoSchema]
// });

// let metaSchema = mongoose.Schema({
//   product_id: Number,
//   ratings: {
//     1: Number,
//     2: Number,
//     3: Number,
//     4: Number,
//     5: Number,
//   },
//   recommended: {
//     true: Number,
//     false: Number
//   },
//   characteristics: {
//     Fit : {
//       id: Number,
//       value: Number
//     },
//     Length: {
//       id: Number,
//       value: Number
//     },
//     Comfort: {
//       id: Number,
//       value: Number
//     },
//     Quality: {
//       id: Number,
//       value: Number
//     }
//   }
// });