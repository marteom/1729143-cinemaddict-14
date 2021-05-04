import { createFilmCommentsTemplate } from './film-comments';
import SmartView from './smart.js';

const createFilmDetailsTemplate = (film = {}) => {
  const {
    title = '',
    poster = '',
    country = '',
    description = '',
    raiting = '',
    duration = '',
    genres = [],
    isWatchList = false,
    isWatched = false,
    isFavorite = false,
    comments = [],
    detailsAge = 0,
    director = '',
    writers = [],
    actors = [],
    releaseDate = '',
    newCommentEmoji = ''
  } = film;

  const getGenres = (genres) => {
    let genresList = '';
    genres.forEach((genre) => genresList += `<span class="film-details__genre">${genre}</span>`);
    return genresList;
  };

  const getNewCommentEmoji = (newCommentEmoji) => {
    if(newCommentEmoji !== ''){
      return `<img src="${newCommentEmoji}" width="55" height="55" alt="emoji">`;
    }
    else{
      return '';
    }
  }

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">
            <p class="film-details__age">${detailsAge}+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${title}</p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${raiting}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genres.length > 1 ? 'Genres' : 'Genre'}</td>
                <td class="film-details__cell">
                  ${getGenres(genres)}
                </td>
              </tr>
            </table>  
            <p class="film-details__film-description">${description}</p>
          </div>
        </div>  
        <section class="film-details__controls">
          <input type="checkbox" ${isWatchList ? 'checked' : ''} class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
          <input type="checkbox" ${isWatched ? 'checked' : ''} class="film-details__control-input visually-hidden" id="watched" name="watched">
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
          <input type="checkbox" ${isFavorite ? 'checked' : ''} class="film-details__control-input visually-hidden" id="favorite" name="favorite">
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>  
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
          ${createFilmCommentsTemplate(comments)}          
          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">${getNewCommentEmoji(newCommentEmoji)}</div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>
            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>  
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class FilmDetails extends SmartView {
  constructor(film) {
    super();
    this._film = film;
    this._element = null;
    this._clickHandler = this._clickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favouriteClickHandler = this._favouriteClickHandler.bind(this);
    this._commentEmojiClickHandler = this._commentEmojiClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _watchlistClickHandler() {
    this._callback.watchListClick();
  }

  _watchedClickHandler() {
    this._callback.watchedClick();
  }

  _favouriteClickHandler() {
    this._callback.favouriteClick();
  }

  _commentEmojiClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName === 'IMG') {
      this.updateData(
        Object.assign(
          {},
          this._film,
          {
            newCommentEmoji: evt.target.src
          },
        ), false
      );
      const hiddenInputId = evt.target.parentElement.attributes['for'];
      const hiddenInput = document.getElementById(hiddenInputId.value);
      hiddenInput.checked = true;
    }

    const newCommentEmoji = document.querySelector('.film-details__add-emoji-label');
    if(newCommentEmoji !== null){
      newCommentEmoji.scrollIntoView();
    }

    //this._callback.commentEmojiClick();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    const clickCloseBtn = this.getElement().querySelector('.film-details__close-btn');
    if(clickCloseBtn !== null){
      clickCloseBtn.addEventListener('click', this._clickHandler);
    }
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchListClick = callback;
    const watchlistInput = this.getElement().querySelector('.film-details__control-label--watchlist');
    if(watchlistInput !== null){
      watchlistInput.addEventListener('click', this._watchlistClickHandler);
    }
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    const watchedInput = this.getElement().querySelector('.film-details__control-label--watched');
    if(watchedInput !== null){
      watchedInput.addEventListener('click', this._watchedClickHandler);
    }
  }

  setFavouriteClickHandler(callback) {
    this._callback.favouriteClick = callback;
    const favouriteInput = this.getElement().querySelector('.film-details__control-label--favorite');
    if(favouriteInput !== null){
      favouriteInput.addEventListener('click', this._favouriteClickHandler);
    }
  }

  setCommentEmojiClickHandler(callback) {
    this._callback.commentEmojiClick = callback;
    const newCommentEmoji = this.getElement().querySelector('.film-details__emoji-list');
    if(newCommentEmoji !== null){
      newCommentEmoji.addEventListener('click', this._commentEmojiClickHandler);
    }
  }

  restoreHandlers() {
    this.getElement()
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this._clickHandler);

    this.getElement()
      .querySelector('.film-details__emoji-list')
      .addEventListener('click', this._commentEmojiClickHandler);
  }
}
