import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPostById, upvotePost, addComment, deletePost } from '../models/PostStore';
import Comment from '../components/Comment';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
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
  
  useEffect(() => {
    // Get post details
    const postData = getPostById(id);
    if (postData) {
      setPost({...postData});
    } else {
      // Post not found, redirect to home
      navigate('/');
    }
  }, [id, navigate]);
  
  const handleUpvote = () => {
    const updatedPost = upvotePost(id);
    if (updatedPost) {
      // Create a new object to ensure React detects the change
      setPost({...updatedPost});
    }
  };
  
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = addComment(id, commentText);
      if (newComment) {
        // Update post state with new comment
        setPost({
          ...post,
          comments: [newComment, ...post.comments]
        });
        setCommentText('');
      }
    }
  };
  
  const handleDelete = () => {
    if (isDeleting) {
      const isDeleted = deletePost(id);
      if (isDeleted) {
        navigate('/');
      }
    } else {
      setIsDeleting(true);
    }
  };
  
  if (!post) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="post-detail-page">
      <div className="container">
        <div className="post-header">
          {post.category && (
            <div className={`post-category ${post.category}`}>
              {getCategoryLabel(post.category)}
              {post.isVerified && <span className="verified-badge">Verified</span>}
            </div>
          )}
          
          <h1>{post.title}</h1>
          
          <div className="post-meta">
            <span className="post-date">{formatDate(post.createdAt)}</span>
            <div className="post-actions">
              <button onClick={handleUpvote} className="upvote-button">
                👍 {post.upvotes}
              </button>
              <Link to={`/edit/${post.id}`} className="edit-button">
                Edit
              </Link>
              <button 
                onClick={handleDelete} 
                className={`delete-button ${isDeleting ? 'confirm' : ''}`}
              >
                {isDeleting ? 'Confirm Delete' : 'Delete'}
              </button>
              {isDeleting && (
                <button 
                  onClick={() => setIsDeleting(false)} 
                  className="cancel-delete-button"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="post-content">
          {post.category === 'course-review' && post.courseInfo && (
            <div className="course-info-detailed">
              <h3>Course Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Course Code:</span>
                  <span className="info-value">{post.courseInfo.courseCode}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Professor:</span>
                  <span className="info-value">{post.courseInfo.professor}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Semester:</span>
                  <span className="info-value">{post.courseInfo.semester}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Rating:</span>
                  <span className="info-value">{post.courseInfo.rating}/5</span>
                </div>
              </div>
            </div>
          )}
          
          {post.category === 'item-trade' && post.itemInfo && (
            <div className="item-info-detailed">
              <h3>Item Details</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Price:</span>
                  <span className="info-value price-tag">{post.itemInfo.price}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Condition:</span>
                  <span className="info-value">{post.itemInfo.condition}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Pickup Location:</span>
                  <span className="info-value">{post.itemInfo.location}</span>
                </div>
              </div>
            </div>
          )}
          
          {post.content && <p>{post.content}</p>}
          
          {post.imageUrl && (
            <div className="post-image">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x400?text=Image+Not+Found';
                }}
              />
            </div>
          )}
        </div>
        
        <div className="comments-section">
          <h2>Comments ({post.comments.length})</h2>
          
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
            <button type="submit">Post Comment</button>
          </form>
          
          <div className="comments-list">
            {post.comments.length > 0 ? (
              post.comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
              ))
            ) : (
              <p className="no-comments">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage; 