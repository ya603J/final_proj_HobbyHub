const Comment = ({ comment }) => {
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

  return (
    <div className="comment">
      <p className="comment-text">{comment.text}</p>
      <div className="comment-meta">
        <span className="comment-date">{formatDate(comment.createdAt)}</span>
      </div>
    </div>
  );
};

export default Comment; 