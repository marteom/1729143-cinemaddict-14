import {createElement} from '../helpers/utils';

const getComments = (comments) => {
  let commentsList = '';
  comments.forEach((comment) => commentsList += `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.autor}</span>
          <span class="film-details__comment-day">${comment.date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`);
    console.log('commentsList: ', commentsList);
  return commentsList;
};

const createFilmCommentsTemplate = (comments) => {
  return `
  <ul class="film-details__comments-list">
  ${getComments(comments)}
  </ul>
  `;
};

const createElement2 = (template) => {
  console.log('template: ', template);
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  console.log('newElement: ', newElement);
  console.log('newElement.firstChild: ', newElement.firstChild);
  return newElement.firstChild;
};

export default class FilmComments {
  constructor(comments) {
    this._comments = comments;
    this._element = null;
  }

  getTemplate() {
    return createFilmCommentsTemplate(this._comments);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement2(this.getTemplate());
    }

    return this._element;
  }

  getElement2() {
    if (!this._element) {
      this._element = createElement2(this.getTemplate());
    }

    console.log('this._element: ', this._element);
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

