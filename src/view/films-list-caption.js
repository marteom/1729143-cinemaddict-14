import AbstractView from './abstract.js';

const createFilmsListCaptionTemplate = () => {
  return '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>';
};

export default class FilmsListCaption extends AbstractView {
  getTemplate() {
    return createFilmsListCaptionTemplate();
  }
}
