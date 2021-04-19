import {createElement} from '../helpers/utils';

const createFilmsListCaptionTemplate = () => {
  return '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>';
};

export default class FilmsListCaption {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsListCaptionTemplate();
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
