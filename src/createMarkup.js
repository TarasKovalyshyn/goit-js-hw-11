export function createMurcup(cards) {
  return cards
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `<li class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
          <p class="info-item"> ❤️ 
          <b>${likes}</b>
        </p>
        <p class="info-item">👁 
          <b>${views}</b>
        </p>
        <p class="info-item">💬 
          <b>${comments}</b>
        </p>
        <p class="info-item">⬇️  
          <b>${downloads}</b></p>
          </div>
        </li>`;
    })
    .join('');
}
