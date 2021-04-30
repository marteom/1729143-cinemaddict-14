import FilmCardView from '../view/film-card';
import FilmDetailsView from '../view/film-details';
import { renderElement, RenderPosition, remove, replace } from '../utils/render';
export default class Film{
  constructor(filmsListContainer, changeData){
    this._filmsListContainer = filmsListContainer;
    this._changeData = changeData;
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._handleFilmCardCloseClick = this._handleFilmCardCloseClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);

    this._handleWatchListFilmCardClick = this._handleWatchListFilmCardClick.bind(this);
    this._handleWatchedFilmCardClick = this._handleWatchedFilmCardClick.bind(this);
    this._handleFavouriteFilmCardClick = this._handleFavouriteFilmCardClick.bind(this);
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
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );    
  }

  _handleFavouriteFilmCardClick(){
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  _handleFilmCardClick() {
    const prevFilmDetailsComponent = this._filmDetailsComponent;
    this._filmDetailsComponent = new FilmDetailsView(this._film);

    this._filmDetailsComponent.setClickHandler(this._handleFilmCardCloseClick);
    this._filmDetailsComponent.setWatchlistClickHandler(this._handleWatchListFilmCardClick);
    this._filmDetailsComponent.setWatchedClickHandler(this._handleWatchedFilmCardClick);
    this._filmDetailsComponent.setFavouriteClickHandler(this._handleFavouriteFilmCardClick);
    

    if (prevFilmDetailsComponent === null || prevFilmDetailsComponent === undefined) {
      this._viewFilmDetails();
      return;
    }

    if (document.body.contains(prevFilmDetailsComponent.getElement())) {
      console.log('wwwwww');
      replace(this._filmDetailsComponent, prevFilmDetailsComponent); //!!!!!!!!!!!!!
    }
    
    remove(prevFilmDetailsComponent);

    // this._viewFilmDetails();
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
    //console.log('1: ', this._filmDetailsComponent.getElement(), document.body.contains(this._filmDetailsComponent.getElement()));
    document.body.appendChild(this._filmDetailsComponent.getElement());
    //console.log('2: ', this._filmDetailsComponent.getElement(), document.body.contains(this._filmDetailsComponent.getElement()));
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._handleEscKeyDown);
  };
  
  _hideFilmDetails() {
    document.body.removeChild(this._filmDetailsComponent.getElement());
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._handleEscKeyDown);
  };

  destroy(){
    remove(this._filmCardViewComponent);
    remove(this._filmDetailsComponent);
  }

}