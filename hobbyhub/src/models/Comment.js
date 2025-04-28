// Comment.js - Model for the comment data structure

class Comment {
  constructor(id, text, createdAt = Date.now()) {
    this.id = id;
    this.text = text;
    this.createdAt = createdAt;
  }
}

export default Comment; 