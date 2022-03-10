import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 2000,
  duration: '30s',
};
export default function () {
  const id = Math.floor(Math.random() * 5774593)
  http.get(`http://localhost:3000/api/reviews/meta/${id}`);
  sleep(1);
}