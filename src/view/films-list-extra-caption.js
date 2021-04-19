import {createElement} from '../helpers/utils';

const createFilmsListExtraCaptionTemplate = (innerText) => {
  return `<h2 class="films-list__title">${innerText}</h2>`;
};

export default class FilmsListExtraCaption {
  constructor(innerText) {
    this._innerText = innerText;
    this._element = null;
  }

  getTemplate() {
    return createFilmsListExtraCaptionTemplate(this._innerText);
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
