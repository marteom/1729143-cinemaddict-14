import SortContentView from '../view/sort-content';
import FilmsView from '../view/films';
import FilmsListView from '../view/films-list';
import FilmsListCaptionView from '../view/films-list-caption';
import FilmsListContainerView from '../view/films-list-container';
import ShowMoreView from '../view/showmore-element';
import FilmsListExtraView from '../view/films-list-extra';
import FilmsListExtraCaptionView from '../view/films-list-extra-caption';
import FilmsListEmptyView from '../view/films-list-empty';
import { updateItem } from '../utils/common.js';
import { sortFilmsByDate, sortFilmsByRating } from '../utils/film';
import { remove, RenderPosition, renderElement } from '../utils/render';
import Film from './film';
import { SORT_TYPE } from '../utils/const';


const FILM_COUNT_PER_STEP = 5;
let film_count_showed = FILM_COUNT_PER_STEP;

export default class FilmList {
  constructor(siteMainElement) {
    this._siteMainElement = siteMainElement;
    this._filmPresenter = {};
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
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  _renderFilmCard(filmsListContainer, film) {
    const filmCard = new Film(
      filmsListContainer,
      this._handleFilmChange,
      this._handleModeChange,
    );
    filmCard.init(film);
    this._filmPresenter[film.id] = filmCard;
  }

  _renderFilmsList() {
    if (this._films.length <= 0) {
      this._renderEmptyData();
      return;
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

    for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
      if (this._films.length > i) {
        this._renderFilmCard(
          this._filmsListContainerViewComponent,
          this._films[i],
        );
      }
    }

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }

  }

  _handleSortTypeChange(SORT_TYPE) {
    if (this._currentSortType === SORT_TYPE) {
      return;
    }
    this._sortFilms(SORT_TYPE);
    this._clearFilmsList();
    this._renderFilmsList();
  }

  _sortFilms(SortType) {
    switch (SortType) {
      case SORT_TYPE.DATE:
        this._films.sort(sortFilmsByDate);
        break;
      case SORT_TYPE.RATING:
        this._films.sort(sortFilmsByRating);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currentSortType = SortType;
  }

  _handleModeChange() {
    Object.values(this._filmPresenter).forEach((presenter) =>
      presenter.resetView(),
    );
  }

  _handleShowMoreButtonClick() {
    this._films
      .slice(film_count_showed, film_count_showed + FILM_COUNT_PER_STEP)
      .forEach((film) => {
        this._renderFilmCard(this._filmsListContainerViewComponent, film);
      });

    film_count_showed += FILM_COUNT_PER_STEP;

    if (film_count_showed >= this._films.length) {
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

  _clearFilmsList() {
    Object.values(this._filmPresenter).forEach((presenter) =>
      presenter.destroy(),
    );
    this._filmPresenter = {};
    film_count_showed = FILM_COUNT_PER_STEP;
    remove(this._showMoreViewComponent);
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._sourcedFilms = updateItem(this._sourcedFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  init(films) {
    this._films = films.slice();
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

    this._renderFilmsList();
  }
}
