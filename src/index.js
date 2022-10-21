import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI, PixabayAPI } from './PixabayAPI';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
const pixabay = new PixabayAPI();
// console.log(pixabay);

const refs = {
  form: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  gallaryUl: document.querySelector('.gallery-list'),
};

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { searchQuery },
  } = event.currentTarget;
  const inputQuery = searchQuery.value.trim().toLowerCase();
  //   console.log(inputQuery);

  if (!inputQuery) {
    return Notify.failure('go fuck your self, it`s empty');
  }
  pixabay.getPhotos(inputQuery).then(({ hits }) => {
    const markup = createMurcup(hits);
    console.log(markup);
    refs.gallaryUl.insertAdjacentHTML('beforeend', markup);
  });
};

refs.form.addEventListener('submit', handleSubmit);

function createMurcup(cards) {
  return cards
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `<li class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"> 
            <b>${likes}</b>
          </p>
          <p class="info-item"> 
            <b>${views}</b>
          </p>
          <p class="info-item"> 
            <b>${comments}</b>
          </p>
          <p class="info-item">  
            <b>${downloads}</b>
          </p>
        </div>
      </li>`;
    })
    .join('');
}
