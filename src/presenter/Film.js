import FilmCardView from '../view/film-card';
import FilmDetailsView from '../view/film-details';
import { renderElement, RenderPosition } from '../utils/render';
export default class Film{
  constructor(filmsListContainer){
    this._filmsListContainer = filmsListContainer;

    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._handleFilmCardCloseClick = this._handleFilmCardCloseClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);

    this._handleWatchlistFilmCardClick = this._handleWatchlistFilmCardClick.bind(this);
  }

  init(film){
    this._film = film;
    const filmCardViewComponent = new FilmCardView(film);
    filmCardViewComponent.setClickHandler(this._handleFilmCardClick);
    filmCardViewComponent.setWatchlistClickHandler(this._handleWatchlistFilmCardClick);
    renderElement(this._filmsListContainer, filmCardViewComponent, RenderPosition.BEFOREEND);
  }

  _handleWatchlistFilmCardClick() {
    console.log('wwww');
  }

  _updateFilms(){

  }

  _handleFilmCardClick() {
    this._filmDetails = new FilmDetailsView(this._film);
    this._filmDetails.setClickHandler(this._handleFilmCardCloseClick);
    
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