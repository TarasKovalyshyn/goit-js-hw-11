import { Notify } from 'notiflix';

const axios = require('axios').default;
axios.defaults.baseURL = 'https://pixabay.com/api/';


export class PixabayAPI {
  #page = 1;
  #searchQuery = '';
  #totalPages = 0;
  #perPage = 40;
  #params = {
    params: {
      key: '30729549-2bd6081b47c896583f9f8b2cd',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: this.#perPage,
    },
  };

  async getPhotos() {
    try {
      const urlAxios = `?page=${this.#page}&q=${this.#searchQuery}`;
      const response = await axios.get(urlAxios, this.#params);

      return response.data;
    } catch (error) {
      Notify.failure('Somethin going wrong');
      throw new Error(error.message);
    }
 
  }
  set searchQuery(newSearchQuery) {
    this.#searchQuery = newSearchQuery;
  }
  get searchQuery() {
    return this.#searchQuery;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  calculateTotalPages(total) {
    this.#totalPages = Math.ceil(total / this.#perPage);
  }

  // getPage() {
  //   return this.page;
  // }

  get isShowLoadMore() {
    return this.#page < this.#totalPages;
  }
}
