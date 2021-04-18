import {createElement} from '../helpers/utils';

const createProfileTemplate = (raiting) => {
  return `<section class="header__profile profile">
    <p class="profile__rating">${raiting}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class Profile {
  constructor(raiting) {
    this._raiting = raiting;
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._raiting);
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