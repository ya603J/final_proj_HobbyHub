import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get category label
  const getCategoryLabel = (category) => {
    switch(category) {
      case 'course-review':
        return 'Course Review';
      case 'item-trade':
        return 'Marketplace';
      default:
        return 'General';
    }
  };

  return (
    <div className="post-card">
      {post.category && (
        <div className={`post-category ${post.category}`}>
          {getCategoryLabel(post.category)}
          {post.isVerified && <span className="verified-badge">Verified</span>}
        </div>
      )}
      
      <div className="post-meta">
        <span className="post-date">{formatDate(post.createdAt)}</span>
        <span className="post-upvotes">👍 {post.upvotes}</span>
      </div>
      
      <h2 className="post-title">
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h2>
      
      {post.category === 'course-review' && post.courseInfo && (
        <div className="course-info">
          <div><strong>Professor:</strong> {post.courseInfo.professor}</div>
          <div><strong>Semester:</strong> {post.courseInfo.semester}</div>
          <div><strong>Rating:</strong> {post.courseInfo.rating}/5</div>
        </div>
      )}
      
      {post.category === 'item-trade' && post.itemInfo && (
        <div className="item-info">
          <div className="price-tag">{post.itemInfo.price}</div>
          <div><strong>Condition:</strong> {post.itemInfo.condition}</div>
          <div><strong>Pickup:</strong> {post.itemInfo.location}</div>
        </div>
      )}
      
      <div className="post-footer">
        <Link to={`/post/${post.id}`} className="post-link">Read more</Link>
        <span className="post-comments">{post.comments.length} comments</span>
      </div>
    </div>
  );
};

export default PostCard; 