const app = require('./index.js');
const supertest = require('supertest');
const request = supertest(app);

const { id } = 1;
it ('Gets the reviews for product id 1', async () => {
  const res = await request.get('/api/reviews/1/');
  console.log(res.body);
  expect(res.status).toBe(200);
  expect(res.body.results.length).toBe(3);
});