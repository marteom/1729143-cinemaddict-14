import {createElement} from '../helpers/utils';

const createFilmsListExtraTemplate = () => {
  return '<section class="films-list films-list--extra"></section>';
};

export default class FilmsListExtra {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsListExtraTemplate();
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
