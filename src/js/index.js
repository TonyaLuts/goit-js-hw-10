// import axios from 'axios';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

export const refs = {
  select: document.querySelector('#selectElement'),
  // select: document.querySelector('.breed-select'),
  loaderData: document.querySelector('.loader'),
  errorData: document.querySelector('.error'),
  catCard: document.querySelector('.cat-info'),
};

refs.select.addEventListener('change', onSearch);

fetchBreeds()
  .then(options => {
    refs.select.disabled = false;
    // refs.select.style.style.display = 'none';
    const markup = options
      .map(option => {
        return `<option value="${option.id}"> ${option.name}</option>`;
      })
      .join('');
    refs.select.innerHTML = markup;
    refs.loaderData.style.display = 'none';
    new SlimSelect({
      select: '#selectElement',
    });
  })
  .catch(error => {
    refs.errorData.style.display = 'none';
    refs.loaderData.style.display = 'none';
    refs.select.disabled = true;
    console.log(error);
    Notiflix.Notify.failure(
      `Oops! Something went wrong! Try reloading the page!`
    );
  });

function onSearch(event) {
  event.preventDefault();

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      renderCard(data);
    })
    .catch(error => {
      refs.errorData.style.display = 'none';
      refs.loaderData.style.display = 'none';
      refs.select.disabled = true;
      console.log(error);
      Notiflix.Notify.failure(
        `Oops! Something went wrong! Try reloading the page!`
      );

      refs.catCard.innerHTML = '';
    });
}

function renderCard(data) {
  refs.catCard.style.visibility = 'visible';
  refs.loaderData.style.display = 'none';

  const { url, breeds } = data[0];
  refs.catCard.innerHTML = `
            <div class="box-img">
            <img src="${url}" alt="${breeds[0].name}" width="600" />
            </div>
            <div class="box-dascr">
            <h1>${breeds[0].name}</h1>
            <h4>About:</h4>
            <p>${breeds[0].description}</p>
            <h4>Temperament:</h4>
            <p>${breeds[0].temperament}</p>
            </div>`;
}
