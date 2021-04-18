import {createElement} from '../helpers/utils';

const createFooterStatisticTemplate = (allFilmCount) => {
  return `<p>${allFilmCount} movies inside</p>`;
};


export default class FooterStatistic {
  constructor(allFilmCount) {
    this._allFilmCount = allFilmCount;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._allFilmCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}