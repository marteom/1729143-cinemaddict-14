import AbstractView from './abstract.js';

const createFooterStatisticTemplate = (allFilmCount) => {
  return `<p>${allFilmCount} movies inside</p>`;
};


export default class FooterStatistic extends AbstractView {
  constructor(allFilmCount) {
    super();
    this._allFilmCount = allFilmCount;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._allFilmCount);
  }
}
