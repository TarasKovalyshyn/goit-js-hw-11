export class PixabayAPI {
  #page = 1;
  #searchQuery = ' ';
  getPhotos() {
    const url = `https://pixabay.com/api/?key=30729549-2bd6081b47c896583f9f8b2cd&q=${
      this.#searchQuery
    }&image_type=photo&orientation=horizontal&safesearch=true&page=${
      this.#page
    }`;
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
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
}
