import AbstractView from './abstract.js';
import { SORT_TYPE } from '../utils/const';

const createSortContentTemplate = () => {
  return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SORT_TYPE.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SORT_TYPE.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SORT_TYPE.RATING}">Sort by rating</a></li>
  </ul>`;
};

export default class SortContent extends AbstractView {
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortContentTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    const activeSortA = document.querySelector('.sort__button--active');
    if(activeSortA !== null){
      activeSortA.classList.remove('sort__button--active');
    }
    evt.target.classList.add('sort__button--active');

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }

}
