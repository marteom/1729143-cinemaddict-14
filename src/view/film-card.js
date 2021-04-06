export const createFilmCardTemplate = (film) => {
  const { title, raiting, bornYear, duration, genre, poster, description, isWatchList, isWatched, isFavorite } = film;

  const isWatchListActive = isWatchList ? 'film-card__controls-item--active' : '';
  const isWatchedActive = isWatched ? 'film-card__controls-item--active' : '';
  const isFavoriteActive = isFavorite ? 'film-card__controls-item--active' : '';

  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${raiting}</p>
          <p class="film-card__info">
            <span class="film-card__year">${bornYear}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">5 comments !!!!!</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchListActive}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatchedActive}" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavoriteActive}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};
