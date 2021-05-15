import SortContentView from '../view/sort-content';
import FilmsView from '../view/films';
import FilmsListView from '../view/films-list';
import FilmsListCaptionView from '../view/films-list-caption';
import FilmsListContainerView from '../view/films-list-container';
import ShowMoreView from '../view/showmore-element';
import FilmsListExtraView from '../view/films-list-extra';
import FilmsListExtraCaptionView from '../view/films-list-extra-caption';
import FilmsListEmptyView from '../view/films-list-empty';
import { sortFilmsByDate, sortFilmsByRating } from '../utils/film';
import { remove, RenderPosition, renderElement } from '../utils/render';
import Film from './film';

import Statistic from './statistic';

import { SORT_TYPE, UPDATE_TYPE, MENU_ITEMS } from '../utils/const';
import { menuItems } from '../utils/site-menu';

const FILM_COUNT_PER_STEP = 5;
let film_count_showed = FILM_COUNT_PER_STEP;

export default class FilmList {
  constructor(siteMainElement, filmsModel, menusModel) {
    this._siteMainElement = siteMainElement;
    this._filmsModel = filmsModel;
    this._menusModel = menusModel;
    this._filmPresenter = {};
    this._statisticPresenter = null;
    this._currentSortType = SORT_TYPE.DEFAULT;
    this._sortContentViewComponent = new SortContentView();
    this._filmsViewComponent = new FilmsView();
    this._filmsListViewComponent = new FilmsListView();
    this._filmsListEmptyViewComponent = new FilmsListEmptyView();
    this._filmsListCaptionViewComponent = new FilmsListCaptionView();
    this._filmsListContainerViewComponent = new FilmsListContainerView();
    this._showMoreViewComponent = new ShowMoreView();
    this._filmsListExtraViewComponent = new FilmsListExtraView();
    this._filmsListExtraCaptionViewComponent = new FilmsListExtraCaptionView();
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleModelChange = this._handleModelChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  _renderFilmCard(filmsListContainer, film) {
    const filmCard = new Film(
      filmsListContainer,
      this._handleFilmChange,
      this._handleModelChange,
    );
    filmCard.init(film);
    this._filmPresenter[film.id] = filmCard;
  }

  _renderStatistics(statisticContainer, films) {
    this._statisticPresenter = new Statistic(statisticContainer);
    this._statisticPresenter.init(films);
  }

  _clearStatistics() {
    this._statisticPresenter.destroy();
    this._statisticPresenter = null;
  }

  _renderFilmsList(films) {
    if(this._statisticPresenter !== null){
      this._clearStatistics();
    }

    if(this._menusModel.getMenuItem() === MENU_ITEMS.STATISTICS){
      this._filmsViewComponent.hide();
      this._renderStatistics(this._siteMainElement, films);
    }

    else{
      if (films.length <= 0) {
        this._renderEmptyData();
        return;
      }
      else {
        remove(this._filmsListEmptyViewComponent);
      }

      renderElement(
        this._filmsListViewComponent,
        this._filmsListCaptionViewComponent,
        RenderPosition.BEFOREEND,
      );
      renderElement(
        this._filmsListViewComponent,
        this._filmsListContainerViewComponent,
        RenderPosition.BEFOREEND,
      );

      this._renderSort();

      for (let i = 0; i < film_count_showed; i++) {
        if (films.length > i) {
          this._renderFilmCard(
            this._filmsListContainerViewComponent,
            films[i],
          );
        }
      }

      if (films.length > film_count_showed) {
        this._renderShowMoreButton();
      }

      this._filmsViewComponent.show();
    }
  }

  _handleSortTypeChange(SortType) {
    if (this._currentSortType === SortType) {
      return;
    }
    this._clearFilmsList();
    this._renderFilmsList(this._getSortedFilms(SortType));
  }

  _getSortedFilms(SortType) {
    const films = this._getFilms();
    this._currentSortType = SortType;
    switch (SortType) {
      case SORT_TYPE.DATE:
        return films.sort(sortFilmsByDate);
      case SORT_TYPE.RATING:
        return films.sort(sortFilmsByRating);
      default:
        return films;
    }
  }

  _setFilms(filmsToSet) {
    this._filmsModel.setFilms(filmsToSet);
  }

  _getFilms() {
    const menuItemType = this._menusModel.getMenuItem();
    const films = this._filmsModel.getFilms();

    if(menuItemType === MENU_ITEMS.STATISTICS){
      return menuItems[MENU_ITEMS.ALL](films);
    }

    return menuItems[menuItemType](films);
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UPDATE_TYPE.MINOR:
        this._clearFilmsList();
        this._renderFilmsList(this._getFilms());
        break;
      case UPDATE_TYPE.MAJOR:
        this._clearSort();
        this._renderSort();
        this._clearFilmsList(true);
        this._renderFilmsList(this._getFilms());
        break;
    }
  }

  _handleModelChange() {
    Object.values(this._filmPresenter).forEach((presenter) =>
      presenter.resetView(),
    );
  }

  _handleShowMoreButtonClick() {
    const films = this._getSortedFilms(this._currentSortType);
    films
      .slice(film_count_showed, film_count_showed + FILM_COUNT_PER_STEP)
      .forEach((film) => {
        this._renderFilmCard(this._filmsListContainerViewComponent, film);
      });

    film_count_showed += FILM_COUNT_PER_STEP;

    if (film_count_showed >= films.length) {
      remove(this._showMoreViewComponent);
    }
  }

  _renderShowMoreButton() {
    renderElement(
      this._filmsListViewComponent,
      this._showMoreViewComponent,
      RenderPosition.BEFOREEND,
    );
    this._showMoreViewComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderEmptyData() {
    renderElement(
      this._filmsListViewComponent,
      this._filmsListEmptyViewComponent,
      RenderPosition.BEFOREEND,
    );
  }

  _renderSort() {
    renderElement(
      this._filmsListViewComponent,
      this._sortContentViewComponent,
      RenderPosition.AFTERBEGIN,
    );
    this._sortContentViewComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _clearSort(){
    this._currentSortType = SORT_TYPE.DEFAULT;
    remove(this._sortContentViewComponent);
  }

  _clearFilmsList(resetFilmsShowed = false) {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy(),
      );
    this._filmPresenter = {};

    resetFilmsShowed ? film_count_showed = FILM_COUNT_PER_STEP : '';

    remove(this._showMoreViewComponent);
  }

  destroy() {
    this._clearFilmsList(true);

    remove(this._filmsListViewComponent);
    remove(this._filmsViewComponent);

    this._filmsModel.removeObserver(this._handleModelEvent);
    this._menusModel.removeObserver(this._handleModelEvent);
  }

  _handleFilmChange(updateType, updatedFilm) {
    this._filmsModel.updateFilm(updateType, updatedFilm);
  }

  init() {
    const films = this._getFilms();
    this._sourcedFilms = films.slice();
    renderElement(
      this._siteMainElement,
      this._sortContentViewComponent,
      RenderPosition.BEFOREEND,
    );
    renderElement(
      this._siteMainElement,
      this._filmsViewComponent,
      RenderPosition.BEFOREEND,
    );
    renderElement(
      this._filmsViewComponent,
      this._filmsListViewComponent,
      RenderPosition.BEFOREEND,
    );

    this._filmsModel.addObserver(this._handleModelEvent);
    this._menusModel.addObserver(this._handleModelEvent);

    this._renderFilmsList(this._sourcedFilms);
  }
}
