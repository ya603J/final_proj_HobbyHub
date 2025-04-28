// Post.js - Model for the post data structure

class Post {
  constructor(
    id, 
    title, 
    content = "", 
    imageUrl = "", 
    category = "general", // "course-review" or "item-trade" or "general"
    courseInfo = null, // For course reviews: { courseCode, professor, semester, rating }
    itemInfo = null, // For items to trade: { price, condition, location }
    createdAt = Date.now(), 
    upvotes = 0, 
    comments = [],
    isVerified = true
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.imageUrl = imageUrl;
    this.category = category;
    this.courseInfo = courseInfo;
    this.itemInfo = itemInfo;
    this.createdAt = createdAt;
    this.upvotes = upvotes;
    this.comments = comments;
    this.isVerified = isVerified;
  }
}

export default Post; 