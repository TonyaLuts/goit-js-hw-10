import axios from 'axios';
import { refs } from './index';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_yN5OxJ17qbAQWpVm9KTzMZxWmHS0IT7EH8C3dwu13FNCcBzXWA7qYpHCfGolRbLX';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  refs.catCard.style.visibility = 'hidden';
  refs.loaderData.style.display = 'block';
  refs.select.disabled = true;

  return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  refs.catCard.style.visibility = 'hidden';
  refs.loaderData.style.display = 'block';

  return fetch(
    `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}
