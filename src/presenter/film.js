import FilmCardView from '../view/film-card';
import FilmDetailsView from '../view/film-details';
import { renderElement, RenderPosition, remove, replace } from '../utils/render';
import { UPDATE_TYPE } from '../utils/const';
import { getUtcDateNow } from '../utils/common';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class Film{
  constructor(filmsListContainer, changeData, changeMode){
    this._filmsListContainer = filmsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._handleFilmCardCloseClick = this._handleFilmCardCloseClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._mode = Mode.DEFAULT;
    this._handleWatchListFilmCardClick = this._handleWatchListFilmCardClick.bind(this);
    this._handleWatchedFilmCardClick = this._handleWatchedFilmCardClick.bind(this);
    this._handleFavouriteFilmCardClick = this._handleFavouriteFilmCardClick.bind(this);
    this._handleCommentDeleteClick = this._handleCommentDeleteClick.bind(this);
    this._handleCommentAddClick = this._handleCommentAddClick.bind(this);
  }

  init(film){
    this._film = film;
    const prevFilmCardComponent = this._filmCardViewComponent;
    this._filmCardViewComponent = new FilmCardView(film);
    this._filmCardViewComponent.setClickHandler(this._handleFilmCardClick);
    this._filmCardViewComponent.setWatchlistClickHandler(this._handleWatchListFilmCardClick);
    this._filmCardViewComponent.setWatchedClickHandler(this._handleWatchedFilmCardClick);
    this._filmCardViewComponent.setFavouriteClickHandler(this._handleFavouriteFilmCardClick);

    if (prevFilmCardComponent === null || prevFilmCardComponent === undefined) {
      renderElement(this._filmsListContainer, this._filmCardViewComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmsListContainer.getElement().contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardViewComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  }

  _handleWatchListFilmCardClick() {
    this._changeData(
      this._mode === Mode.DEFAULT ? UPDATE_TYPE.MINOR : this._mode === Mode.POPUP ? UPDATE_TYPE.PATCH : '',
      Object.assign(
        {},
        this._film,
        {
          isWatchList: !this._film.isWatchList,
        },
      ),
    );
  }

  _handleWatchedFilmCardClick(){
    this._changeData(
      this._mode === Mode.DEFAULT ? UPDATE_TYPE.MINOR : this._mode === Mode.POPUP ? UPDATE_TYPE.PATCH : '',
      Object.assign(
        {},
        this._film,
        {
          watched:{
            already_watched: !this._film.watched.already_watched,
            watching_date: this._film.watched.already_watched ? '' : getUtcDateNow(),
          },
        },
      ),
    );
  }

  _handleFavouriteFilmCardClick(){
    this._changeData(
      this._mode === Mode.DEFAULT ? UPDATE_TYPE.MINOR : this._mode === Mode.POPUP ? UPDATE_TYPE.PATCH : '',
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  _handleCommentAddClick(comment) {
    const existingComments = this._film.comments;
    existingComments.push(comment);
    const newObject = Object.assign(
      {},
      this._film,
      {
        comments: existingComments,
      },
    );

    this._changeData(
      this._mode === Mode.DEFAULT ? UPDATE_TYPE.MINOR : this._mode === Mode.POPUP ? UPDATE_TYPE.PATCH : '',
      newObject,
    );

    this._filmDetailsComponent.updateComments(newObject.comments);
  }

  _handleCommentDeleteClick(id) {
    this._changeData(
      this._mode === Mode.DEFAULT ? UPDATE_TYPE.MINOR : this._mode === Mode.POPUP ? UPDATE_TYPE.PATCH : '',
      Object.assign(
        {},
        this._film,
        {
          comments: this._film.comments.filter( (comment) => comment.id != id),
        },
      ),
    );
    this._filmDetailsComponent.updateComments(this._film.comments.filter((comment) => comment.id != id));
  }

  _handleFilmCardClick() {
    this._filmDetailsComponent = new FilmDetailsView(this._film);
    this._filmDetailsComponent.setClickHandler(this._handleFilmCardCloseClick);
    this._filmDetailsComponent.setWatchlistClickHandler(this._handleWatchListFilmCardClick);
    this._filmDetailsComponent.setWatchedClickHandler(this._handleWatchedFilmCardClick);
    this._filmDetailsComponent.setFavouriteClickHandler(this._handleFavouriteFilmCardClick);
    this._filmDetailsComponent.setCommentDeleteClickHandler(this._handleCommentDeleteClick);
    this._filmDetailsComponent.setCommentAddClickHandler(this._handleCommentAddClick);
    this._viewFilmDetails(true);
  }

  _handleFilmCardCloseClick() {
    this._hideFilmDetails();
  }

  _handleEscKeyDown(evt){
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._hideFilmDetails();
    }
  }

  _viewFilmDetails() {
    this._changeMode();
    this._mode = Mode.POPUP;
    document.body.appendChild(this._filmDetailsComponent.getElement());
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._handleEscKeyDown);
  }

  _hideFilmDetails() {
    this._mode = Mode.DEFAULT;
    document.body.removeChild(this._filmDetailsComponent.getElement());
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._handleEscKeyDown);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._hideFilmDetails();
    }
  }

  destroy(){
    remove(this._filmCardViewComponent);
    if(this._filmDetailsComponent !== undefined){
      remove(this._filmDetailsComponent);
    }
  }
}
