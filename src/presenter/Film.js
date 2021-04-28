import FilmCardView from '../view/film-card';
import FilmDetailsView from '../view/film-details';
import { renderElement, RenderPosition } from '../utils/render';
export default class Film{
  constructor(filmsListContainer){
    this._filmsListContainer = filmsListContainer;

    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._handleFilmCardCloseClick = this._handleFilmCardCloseClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);

    this._handleWatchListFilmCardClick = this._handleWatchListFilmCardClick.bind(this);
    this._handleWatchedFilmCardClick = this._handleWatchedFilmCardClick.bind(this);
    this._handleFavouriteFilmCardClick = this._handleFavouriteFilmCardClick.bind(this);
  }

  init(film){
    this._film = film;
    const filmCardViewComponent = new FilmCardView(film);
    filmCardViewComponent.setClickHandler(this._handleFilmCardClick);
    filmCardViewComponent.setWatchlistClickHandler(this._handleWatchListFilmCardClick);
    filmCardViewComponent.setWatchedClickHandler(this._handleWatchedFilmCardClick);
    filmCardViewComponent.setFavouriteClickHandler(this._handleFavouriteFilmCardClick);

    renderElement(this._filmsListContainer, filmCardViewComponent, RenderPosition.BEFOREEND);
  }

  _handleWatchListFilmCardClick() {
    console.log('_handleWatchListFilmCardClick');
  }

  _handleWatchedFilmCardClick(){
    console.log('_handleWatchedFilmCardClick');
  }

  _handleFavouriteFilmCardClick(){
    console.log('_handleFavouriteFilmCardClick');
  }

  _updateFilms(){

  }

  _handleFilmCardClick() {
    this._filmDetails = new FilmDetailsView(this._film);
    this._filmDetails.setClickHandler(this._handleFilmCardCloseClick);

    this._filmDetails.setWatchlistClickHandler(this._handleWatchListFilmCardClick);
    this._filmDetails.setWatchedClickHandler(this._handleWatchedFilmCardClick);
    this._filmDetails.setFavouriteClickHandler(this._handleFavouriteFilmCardClick);
    
    this._viewFilmDetails();
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
    document.body.appendChild(this._filmDetails.getElement());
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._handleEscKeyDown);
  };
  
  _hideFilmDetails() {
    document.body.removeChild(this._filmDetails.getElement());
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._handleEscKeyDown);
  };

}