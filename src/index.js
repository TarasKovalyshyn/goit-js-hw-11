import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI, PixabayAPI } from './PixabayAPI';
import { createMurcup } from './createMarkup';
import { refs } from './refs';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
const pixabay = new PixabayAPI();
// console.log(pixabay);

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { searchQuery },
  } = event.currentTarget;
  const inputQuery = searchQuery.value.trim().toLowerCase();


  if (!inputQuery) {
    Notify.failure('go fuck your self, it`s empty');
    return;
  }
  pixabay.searchQuery = inputQuery;
  pixabay.getPhotos().then(({ hits }) => {
    const markup = createMurcup(hits);
    refs.gallaryUl.insertAdjacentHTML('beforeend', markup);
  });
};
const onLoadMore = () => {
  pixabay.incrementPage();
  pixabay.getPhotos().then(({ hits }) => {
    const markup = createMurcup(hits);
    refs.gallaryUl.insertAdjacentHTML('beforeend', markup);
  });
  
};
refs.form.addEventListener('submit', handleSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
