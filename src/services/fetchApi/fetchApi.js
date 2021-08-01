const axios = require('axios').default;
const BASE_KEY = '3aab4c1f76a1efe04160121651aea548';
const BASE_URL = 'https://api.themoviedb.org/3/';

function fetchApiTrend(page = 1) {
  return axios
    .get(
      `
    ${BASE_URL}trending/all/day?api_key=${BASE_KEY}`,
    )
    .then(r => r.data);
}

function fetchApiSearch(searchValue, page = 1) {
  return axios
    .get(
      `${BASE_URL}search/movie?api_key=${BASE_KEY}&query=${searchValue}&page=${page}include_adult=false`,
    )
    .then(r => r.data);
}

function fetchApiInfo(searchId) {
  return axios
    .get(
      `
    ${BASE_URL}movie/${searchId}?api_key=${BASE_KEY}`,
    )
    .then(r => r.data);
}

function fetchApiInfoCredits(searchId) {
  return axios
    .get(
      `
    ${BASE_URL}movie/${searchId}/credits?api_key=${BASE_KEY}`,
    )
    .then(r => r.data);
}

function fetchApiReview(searchId, page = 1) {
  return axios
    .get(
      `
    ${BASE_URL}movie/${searchId}/reviews?api_key=${BASE_KEY}&page=${page}`,
    )
    .then(r => r.data);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetchApiTrend,
  fetchApiSearch,
  fetchApiInfoCredits,
  fetchApiReview,
  fetchApiInfo,
};
