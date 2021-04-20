import AbstractView from './abstract.js';

const createFilmsListExtraTemplate = () => {
  return '<section class="films-list films-list--extra"></section>';
};

export default class FilmsListExtra extends AbstractView {
  getTemplate() {
    return createFilmsListExtraTemplate();
  }
}
