import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI, PixabayAPI } from './PixabayAPI';
import { createMurcup } from './createMarkup';
import { refs } from './refs';

const pixabay = new PixabayAPI();
// -----------------------------------------------------------
const handleSubmit = event => {
  event.preventDefault();

  const { 
    elements: { searchQuery },
  } = event.currentTarget;
  const inputValue = searchQuery.value.trim().toLowerCase();

  if (!inputValue) {
    Notify.failure('Search string is empty, type something ');
    return;
  }

  pixabay.searchQuery = inputValue;
  clearPage();
  pixabay
    .getPhotos()
    .then(({ hits, total }) => {
      if (total > 0) {
        Notify.success(`We found ${total} images by query 
        "${inputValue}"`);
      } else {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      const markup = createMurcup(hits);
      refs.gallaryUl.insertAdjacentHTML('beforeend', markup);

      pixabay.calculateTotalPages(total);

      if (pixabay.isShowLoadMore) {
        refs.loadMoreBtn.classList.remove('is-hidden');
      }
    })
    .catch(error => {
      Notify.failure(error.message, 'Something going wrong!');
      clearPage();
    });
};

// ---------------------------------------------------------------------
const onLoadMore = () => {
  pixabay.incrementPage();

  if (!pixabay.isShowLoadMore) {
    refs.loadMoreBtn.classList.add('is-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
  }

  pixabay
    .getPhotos()
    .then(({ hits }) => {
      const markup = createMurcup(hits);
      refs.gallaryUl.insertAdjacentHTML('beforeend', markup);
    })
    .catch(error => {
      Notify.failure(error.message, 'Something going wrong!');
      clearPage();
    });
};
// -------------------------------------------------------------------
refs.form.addEventListener('submit', handleSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function clearPage() {
  pixabay.resetPage();
  refs.gallaryUl.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
}
