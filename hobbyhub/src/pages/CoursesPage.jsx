import { useState, useEffect } from 'react';
import { getAllPosts } from '../models/PostStore';
import PostCard from '../components/PostCard';

const CoursesPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('newest'); // 'newest' or 'upvotes'
  
  // Fetch posts initially and when the component is focused
  useEffect(() => {
    // Load posts on initial render
    loadPosts();
    
    // Add event listener for focus to refresh posts data
    window.addEventListener('focus', loadPosts);
    
    // Clean up
    return () => {
      window.removeEventListener('focus', loadPosts);
    };
  }, []);
  
  // Function to load posts data
  const loadPosts = () => {
    // Only load course review posts
    const allPosts = getAllPosts();
    const courseReviews = allPosts.filter(post => post.category === 'course-review');
    setPosts(courseReviews);
  };
  
  // Filter posts based on search term
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort posts based on sort type
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortType === 'newest') {
      return b.createdAt - a.createdAt;
    } else if (sortType === 'upvotes') {
      return b.upvotes - a.upvotes;
    }
    return 0;
  });
  
  return (
    <div className="courses-page">
      <div className="container">
        <div className="page-header">
          <h1>Course Reviews</h1>
          <p className="page-description">
            Find honest reviews from verified students about courses across our campus.
            Looking for a specific course? Use the search below to filter by course name or code.
          </p>
          
          <div className="filters">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by course name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="sort-options">
              <label>Sort by: </label>
              <select 
                value={sortType} 
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="upvotes">Most Helpful</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="posts-grid">
          {sortedPosts.length > 0 ? (
            sortedPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="no-posts-message">
              <h3>No course reviews found</h3>
              <p>
                {searchTerm 
                  ? `No course reviews match "${searchTerm}". Try a different search term.` 
                  : "Be the first to review a course! Share your experience to help other students."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage; 