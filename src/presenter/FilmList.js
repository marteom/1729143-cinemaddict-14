import SortContentView from '../view/sort-content';
import FilmsView from '../view/films';
import FilmsListView from '../view/films-list';
import FilmsListCaptionView from '../view/films-list-caption';
import FilmsListContainerView from '../view/films-list-container';
import ShowMoView from '../view/showmo-element';
import FilmsListExtraView from '../view/films-list-extra';
import FilmsListExtraCaptionView from '../view/films-list-extra-caption';
import FilmsListEmptyView from '../view/films-list-empty';
import { EXTRA_CAPTIONS } from '../utils/const';
import { getMostCommented, getTopRat } from '../utils/film';
import {updateItem} from '../utils/common.js';
import { remove, RenderPosition, renderElement } from '../utils/render';
import Film from './Film';

const FILM_COUNT_PER_STEP = 5;
let film_count_showed = FILM_COUNT_PER_STEP;
const FILM_EXTRA_COUNT = 2;

export default class FilmList{
  constructor(siteMainElement){
    this._siteMainElement = siteMainElement;
    this._filmPresenter = {};
    this._sortContentViewComponent = new SortContentView();
    this._filmsViewComponent = new FilmsView();
    this._filmsListViewComponent = new FilmsListView();
    this._filmsListEmptyViewComponent = new FilmsListEmptyView();
    this._filmsListCaptionViewComponent = new FilmsListCaptionView();
    this._filmsListContainerViewComponent = new FilmsListContainerView();
    this._showMoViewComponent = new ShowMoView();
    this._filmsListExtraViewComponent = new FilmsListExtraView();
    this._filmsListExtraCaptionViewComponent = new FilmsListExtraCaptionView();
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoButtonClick = this._handleShowMoButtonClick.bind(this);

  }

  _renderFilmCard(filmsListContainer, film){
    const filmCard = new Film(filmsListContainer, this._handleFilmChange);
    filmCard.init(film);
    this._filmPresenter[film.id] = filmCard;
  };

  _renderFilmsList(){
    if(this._films.length <= 0){
        this._renderEmptyData();
        return;
      }

    renderElement(this._filmsListViewComponent, this._filmsListCaptionViewComponent, RenderPosition.BEFOREEND);
    renderElement(this._filmsListViewComponent, this._filmsListContainerViewComponent, RenderPosition.BEFOREEND);

    for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
      if (this._films.length > i) {
        this._renderFilmCard(this._filmsListContainerViewComponent, this._films[i]);
      }
    }

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoButton();
    }

    // разнести по _renderTopRated и _renderMostCommented
      // renderElement(this._filmsListViewComponent, new FilmsListExtraView(), RenderPosition.BEFOREEND);
      // renderElement(this._filmsListViewComponent, new FilmsListExtraView(), RenderPosition.BEFOREEND);
      // const siteContentFilmsListExtras = this._filmsListViewComponent.querySelectorAll('.films-list--extra');
      // for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
      //   renderElement(siteContentFilmsListExtras[i], new FilmsListExtraCaptionView(EXTRA_CAPTIONS[i]), RenderPosition.BEFOREEND);
      //   renderElement(siteContentFilmsListExtras[i], new FilmsListContainerView(), RenderPosition.BEFOREEND);
      // }
    
      // const topRat = getTopRat(films, FILM_EXTRA_COUNT);
      // for (let i = 0; i < topRat.length; i++) {
      //   const filmsListContainerExtra = siteContentFilmsListExtras[0].querySelector('.films-list__container');
      //   this._renderFilmCard(filmsListContainerExtra, topRat[i]);
      // }
    
      // const mostCommented = getMostCommented(films, FILM_EXTRA_COUNT);
      // for (let i = 0; i < mostCommented.length; i++) {
      //   const filmsListContainerExtra = siteContentFilmsListExtras[1].querySelector('.films-list__container');
      //   this._renderFilmCard(filmsListContainerExtra, mostCommented[i]);
      // }


  }

  _handleShowMoButtonClick() {
    this._films
    .slice(film_count_showed, film_count_showed + FILM_COUNT_PER_STEP)
    .forEach((film) => {
      this._renderFilmCard(this._filmsListContainerViewComponent, film);
    });

    film_count_showed += FILM_COUNT_PER_STEP;

    if (film_count_showed >= this._films.length) {
      remove(this._showMoViewComponent);
    }
  }

  _renderShowMoButton(){
    renderElement(this._filmsListViewComponent, this._showMoViewComponent, RenderPosition.BEFOREEND);
    this._showMoViewComponent.setClickHandler(this._handleShowMoButtonClick);
  }

  _renderTopRated(){

  }

  _renderMostCommented(){
    
  }

  _renderEmptyData(){
    renderElement(this._filmsListViewComponent , this._filmsListEmptyViewComponent, RenderPosition.BEFOREEND);
  }

  _clearFilmsList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    film_count_showed = FILM_COUNT_PER_STEP;
    remove(this._showMoViewComponent);
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._boardTasks, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  init(films){
    this._films = films;
    renderElement(this._siteMainElement, this._sortContentViewComponent, RenderPosition.BEFOREEND);
    renderElement(this._siteMainElement, this._filmsViewComponent, RenderPosition.BEFOREEND);
    renderElement(this._filmsViewComponent, this._filmsListViewComponent, RenderPosition.BEFOREEND);

    this._renderFilmsList();
    
  }
}
