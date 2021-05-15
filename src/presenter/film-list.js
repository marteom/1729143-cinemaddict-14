import SortContentView from '../view/sort-content';
import FilmsView from '../view/films';
import FilmsListView from '../view/films-list';
import StatisticsView from '../view/statistics'
import StatisticFiltersView from '../view/statistic-filters'
import StatisticRankView from '../view/statistic-rank';
import StatisticSectionView from '../view/statistic-section';
import StatisticTextView from '../view/statistic-text';
import FilmsListCaptionView from '../view/films-list-caption';
import FilmsListContainerView from '../view/films-list-container';
import ShowMoreView from '../view/showmore-element';
import FilmsListExtraView from '../view/films-list-extra';
import FilmsListExtraCaptionView from '../view/films-list-extra-caption';
import FilmsListEmptyView from '../view/films-list-empty';
import { sortFilmsByDate, sortFilmsByRating, getFilmsStatSorted } from '../utils/film';
import { remove, RenderPosition, renderElement } from '../utils/render';
import Film from './film';
import { SORT_TYPE, UPDATE_TYPE, MENU_ITEMS, STAT_FILTERS } from '../utils/const';
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
    this._statisticSectionViewComponent = null;
    this._statisticRankViewComponent = null;
    this._statisticFiltersViewComponent = null;
    this._statisticsViewComponent = null;
    this._statisticTextViewComponent = null;
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleModelChange = this._handleModelChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleStatFilterChange = this._handleStatFilterChange.bind(this);
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

    if(this._menusModel.getMenuItem() === MENU_ITEMS.STATISTICS){
      this._filmsViewComponent.hide();

      this._statisticSectionViewComponent = new StatisticSectionView();
      renderElement(this._siteMainElement, this._statisticSectionViewComponent, RenderPosition.BEFOREEND);

      this._statisticRankViewComponent = new StatisticRankView();
      renderElement(this._statisticSectionViewComponent, this._statisticRankViewComponent, RenderPosition.BEFOREEND);

      this._statisticFiltersViewComponent = new StatisticFiltersView();
      renderElement(this._statisticSectionViewComponent, this._statisticFiltersViewComponent, RenderPosition.BEFOREEND);

      this._statisticTextViewComponent = new StatisticTextView(films);
      renderElement(this._statisticSectionViewComponent, this._statisticTextViewComponent, RenderPosition.BEFOREEND);

      this._statisticsViewComponent = new StatisticsView(films);
      renderElement(this._statisticSectionViewComponent, this._statisticsViewComponent, RenderPosition.BEFOREEND);
      this._statisticFiltersViewComponent.setStatFilterChangeHandler(this._handleStatFilterChange);
    }

    else{
      if(this._statisticSectionViewComponent !== null) {
        remove(this._statisticSectionViewComponent);
      }

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

      if (films.length > FILM_COUNT_PER_STEP) {
        this._renderShowMoreButton();
      }

      this._filmsViewComponent.show();      
    }
  }

  _renderStatisticsData(films) {
    this._statisticsViewComponent = new StatisticsView(films);
    renderElement(this._statisticSectionViewComponent, this._statisticsViewComponent, RenderPosition.BEFOREEND);
  }

  _renderStatisticText(films) {
    this._statisticTextViewComponent = new StatisticTextView(films);
    renderElement(this._statisticSectionViewComponent, this._statisticTextViewComponent, RenderPosition.BEFOREEND);
  }

  _handleStatFilterChange(statFilter) {
    const films = this._getFilms();
    remove(this._statisticsViewComponent);
    remove(this._statisticTextViewComponent);
    switch (statFilter) {
      case STAT_FILTERS.ALL:
        this._renderStatisticText(films);
        this._renderStatisticsData(films);
        break;
      case STAT_FILTERS.TODAY:
        const filmsWathedToday = getFilmsStatSorted(films, STAT_FILTERS.TODAY);
        this._renderStatisticText(filmsWathedToday);
        this._renderStatisticsData(filmsWathedToday);
        break;
      case STAT_FILTERS.WEEK:
        const filmsWathedWeek = getFilmsStatSorted(films, STAT_FILTERS.WEEK);
        this._renderStatisticText(filmsWathedWeek);
        this._renderStatisticsData(filmsWathedWeek);
        break;
      case STAT_FILTERS.MONTH:
        const filmsWathedMonth = getFilmsStatSorted(films, STAT_FILTERS.MONTH);
        this._renderStatisticText(filmsWathedMonth);
        this._renderStatisticsData(filmsWathedMonth);
        break;
      case STAT_FILTERS.YEAR:
        const filmsWathedYear = getFilmsStatSorted(films, STAT_FILTERS.YEAR);
        this._renderStatisticText(filmsWathedYear);
        this._renderStatisticsData(filmsWathedYear);
        break;
    }
  }

  _handleSortTypeChange(SortType) {
    if (this._currentSortType === SortType) {
      return;
    }
    this._sortFilms(SortType);
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
        this._renderFilmsList();
        break;
      case UPDATE_TYPE.MAJOR:
        this._clearSort();
        this._renderSort();
        this._clearFilmsList(true);
        this._renderFilmsList();
        break;
    }
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

  _clearSort(){
    remove(this._sortContentViewComponent);
    this._sortFilms(SORT_TYPE.DEFAULT);
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

    this._renderFilmsList();
  }
}
