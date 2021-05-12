import { getHumanizeCommentDate } from '../utils/film';

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
          <span class="film-details__comment-day">${getHumanizeCommentDate(comment.date)}</span>
          <button data-id="${comment.id}" class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>    
    `);
  return commentsList;
};

export const createFilmCommentsTemplate = (comments) => {
  console.log('comments: ',comments);
  return `
  <ul class="film-details__comments-list">
  ${getComments(comments)}
  </ul>
  `;
};
