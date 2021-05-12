import Observer from '../utils/observer.js';
import { USER_ACTION } from '../utils/const';

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  updateComments(userAction, updateType, userComment) {

    console.log('userAction: ', userAction);
    console.log('updateType: ', updateType);
    console.log('userComment: ', userComment);

    // if(userAction === USER_ACTION.DELETE_COMMENT){
    //   const index = this._films.comments.findIndex((comment) => comment.id === userComment.id);

    //   console.log('index: ', index);

    //   if (index === -1) {
    //     throw new Error('Can\'t delete unexisting comment');
    //   }

      // this._films = [
      //   ...this._films.slice(0, index),
      //   userComment,
      //   ...this._films.slice(index + 1),
      // ];

      //this._notify(userAction, userComment);

    //}
  }

}