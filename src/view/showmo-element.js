import {createElement} from '../helpers/utils';

const createShowMoTemplate = () => {
  return '<button class="films-list__show-more">Show more</button>';
};

export default class ShowMo {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowMoTemplate();
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
