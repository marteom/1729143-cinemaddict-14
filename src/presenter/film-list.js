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
import { SORT_TYPE } from '../utils/const';
import { menuItems } from '../utils/site-menu';

const FILM_COUNT_PER_STEP = 5;
let film_count_showed = FILM_COUNT_PER_STEP;

export default class FilmList {
  constructor(siteMainElement, filmsModel, menusModel) {
    this._siteMainElement = siteMainElement;
    this._filmsModel = filmsModel;
    this._menusModel = menusModel;
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

  _renderFilmsList() {
    const films = this._getFilms();

    if (films.length <= 0) {
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
      if (films.length > i) {
        this._renderFilmCard(
          this._filmsListContainerViewComponent,
          films[i],
        );
      }
    }

    if (films.length > FILM_COUNT_PER_STEP) {
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
    const films = this._getFilms();
    switch (SortType) {
      case SORT_TYPE.DATE:
        films.sort(sortFilmsByDate);
        break;
      case SORT_TYPE.RATING:
        films.sort(sortFilmsByRating);
        break;
      default:
        this._setFilms(this._sourcedFilms.slice());
    }

    this._currentSortType = SortType;
  }

  _setFilms(filmsToSet) {
    this._filmsModel.setFilms(filmsToSet);
  }

  _getFilms() {
    const menuItemType = this._menusModel.getMenuItem();
    const films = this._filmsModel.getFilms();
    const filtredFilms = menuItems[menuItemType](films);

    return filtredFilms;
  }

  _handleModelEvent() {
    this._clearFilmsList();
    this._renderFilmsList();
    //this._filmPresenter[data.id].init(data);
    // switch (updateType) {
    //   case UpdateType.PATCH:
    //     this._taskPresenter[data.id].init(data);
    //     break;
    //   case UpdateType.MINOR:
    //     this._clearBoard();
    //     this._renderBoard();
    //     break;
    //   case UpdateType.MAJOR:
    //     this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
    //     this._renderBoard();
    //     break;
    // }
  }

  _handleModelChange() {
    Object.values(this._filmPresenter).forEach((presenter) =>
      presenter.resetView(),
    );
  }

  _handleShowMoreButtonClick() {
    const films = this._getFilms();

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

  _clearFilmsList() {
    Object.values(this._filmPresenter).forEach((presenter) =>
      presenter.destroy(),
    );
    this._filmPresenter = {};
    film_count_showed = FILM_COUNT_PER_STEP;
     //this._currentSortType = SORT_TYPE.DEFAULT;
    remove(this._showMoreViewComponent);
  }

  destroy() {
    this._clearFilmsList(); //({resetRenderedTaskCount: true, resetSortType: true});

    remove(this._filmsListViewComponent);
    remove(this._filmsViewComponent);

    this._filmsModel.removeObserver(this._handleModelEvent);
    this._menusModel.removeObserver(this._handleModelEvent);
  }

  _handleFilmChange(updatedFilm) {
    this._filmsModel.updateFilm(updatedFilm);
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

    this._renderFilmsList();
  }
}
