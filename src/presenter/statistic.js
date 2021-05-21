import { getFilmsStatSorted } from '../utils/film';
import { STAT_FILTERS } from '../utils/const';

import { renderElement, RenderPosition, remove } from '../utils/render';

import StatisticsView from '../view/statistics';
import StatisticFiltersView from '../view/statistic-filters';
import StatisticRankView from '../view/statistic-rank';
import StatisticSectionView from '../view/statistic-section';
import StatisticTextView from '../view/statistic-text';

export default class Statistic {
  constructor(statisticContainer) {
    this._statisticContainer = statisticContainer;

    this._statisticSectionViewComponent = null;
    this._statisticRankViewComponent = null;
    this._statisticFiltersViewComponent = null;
    this._statisticsViewComponent = null;
    this._statisticTextViewComponent = null;

    this._handleStatFilterChange = this._handleStatFilterChange.bind(this);
  }

  init(films) {
    this._films = films;

    this._statisticSectionViewComponent = new StatisticSectionView();
    renderElement(
      this._statisticContainer,
      this._statisticSectionViewComponent,
      RenderPosition.BEFOREEND,
    );

    this._statisticRankViewComponent = new StatisticRankView();
    renderElement(
      this._statisticSectionViewComponent,
      this._statisticRankViewComponent,
      RenderPosition.BEFOREEND,
    );

    this._statisticFiltersViewComponent = new StatisticFiltersView();
    renderElement(
      this._statisticSectionViewComponent,
      this._statisticFiltersViewComponent,
      RenderPosition.BEFOREEND,
    );

    this._statisticTextViewComponent = new StatisticTextView(films);
    renderElement(
      this._statisticSectionViewComponent,
      this._statisticTextViewComponent,
      RenderPosition.BEFOREEND,
    );

    this._statisticsViewComponent = new StatisticsView(films);
    renderElement(
      this._statisticSectionViewComponent,
      this._statisticsViewComponent,
      RenderPosition.BEFOREEND,
    );
    this._statisticFiltersViewComponent.setStatFilterChangeHandler(
      this._handleStatFilterChange,
    );
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
    let films = [];

    remove(this._statisticsViewComponent);
    remove(this._statisticTextViewComponent);

    switch (statFilter) {
      case STAT_FILTERS.ALL:
        this._renderStatisticText(this._films);
        this._renderStatisticsData(this._films);
        break;
      case STAT_FILTERS.TODAY:
        films = getFilmsStatSorted(this._films, STAT_FILTERS.TODAY);
        this._renderStatisticText(films);
        this._renderStatisticsData(films);
        break;
      case STAT_FILTERS.WEEK:
        films = getFilmsStatSorted(this._films, STAT_FILTERS.WEEK);
        this._renderStatisticText(films);
        this._renderStatisticsData(films);
        break;
      case STAT_FILTERS.MONTH:
        films = getFilmsStatSorted(this._films, STAT_FILTERS.MONTH);
        this._renderStatisticText(films);
        this._renderStatisticsData(films);
        break;
      case STAT_FILTERS.YEAR:
        films = getFilmsStatSorted(this._films, STAT_FILTERS.YEAR);
        this._renderStatisticText(films);
        this._renderStatisticsData(films);
        break;
    }
  }

  destroy(){
    remove(this._statisticSectionViewComponent);
    remove(this._statisticRankViewComponent);
    remove(this._statisticFiltersViewComponent);
    remove(this._statisticsViewComponent);
    remove(this._statisticTextViewComponent);
  }

}
