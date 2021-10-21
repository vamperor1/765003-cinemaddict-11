export default class Comments {
  constructor() {
    this._comments = [];
    this._dataChangeHandlers = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = comments;
  }

  deleteComment(id) {
    this._comments = this._comments.filter((comment) => comment.id !== id);
    this._callHandlers(this._dataChangeHandlers);
  }

  createComment(comment) {
    this._comments.push(comment);
    this._callHandlers(this._dataChangeHandlers);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
