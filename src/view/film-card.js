import AbstractView from './abstract.js';

const createFilmCardTemplate = (film) => {
  const { title, raiting, bornYear, duration, genres, poster, description, isWatchList, isWatched, isFavorite, comments } = film;
  const isWatchListActive = isWatchList ? 'film-card__controls-item--active' : '';
  const isWatchedActive = isWatched ? 'film-card__controls-item--active' : '';
  const isFavoriteActive = isFavorite ? 'film-card__controls-item--active' : '';

  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${raiting}</p>
          <p class="film-card__info">
            <span class="film-card__year">${bornYear}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genres[0]}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <div class="film-card__controls">
            <button id="addToWatchlist" class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchListActive}" type="button">Add to watchlist</button>
            <button id="markAsWatched" class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatchedActive}" type="button">Mark as watched</button>
            <button id="markAsFavorite" class="film-card__controls-item button film-card__controls-item--favorite ${isFavoriteActive}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    // this._callbackWatchlist = {};
    // this._callbackWatched = {};
    // this._callbackFavorite = {};
    this._clickHandler = this._clickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    if(evt.target.className === 'film-card__title' || evt.target.className === 'film-card__poster' || evt.target.className === 'film-card__comments'){
      this._callback.click();
    }

    // switch(evt.target.id){
    //   case 'addToWatchlist':
    //     this._addToWatchlist();
    //     break;
    //   case 'markAsWatched':
    //     this._markAsWatched();
    //     break;        
    //   case 'markAsFavorite':
    //     this._markAsFavorite();
    //     break;}

  }

  _addToWatchlist(){
    console.log('_addToWatchlist');
  }

  _markAsWatched(){
    console.log('_markAsWatched');
  }

  _markAsFavorite(){
    console.log('_markAsFavorite');
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchListClick = callback;
    
    const watchlistButton = this.getElement().querySelector('.film-card__controls-item--add-to-watchlist');
    if(watchlistButton !== null){
      watchlistButton.addEventListener('click', this._watchlistClickHandler);
    }
  }

}
