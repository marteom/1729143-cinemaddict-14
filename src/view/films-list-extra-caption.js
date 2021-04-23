import AbstractView from './abstract.js';

const createFilmsListExtraCaptionTemplate = (innerText) => {
  return `<h2 class="films-list__title">${innerText}</h2>`;
};

export default class FilmsListExtraCaption extends AbstractView {
  constructor(innerText) {
    super();
    this._innerText = innerText;
  }

  getTemplate() {
    return createFilmsListExtraCaptionTemplate(this._innerText);
  }
}
