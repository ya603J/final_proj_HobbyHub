import { useState, useEffect } from 'react';
import { getAllPosts } from '../models/PostStore';
import PostCard from '../components/PostCard';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('newest'); // 'newest' or 'upvotes'
  const [activeCategory, setActiveCategory] = useState('all'); // 'all', 'course-review', 'item-trade', 'general'
  
  // Fetch posts initially and when the component is focused
  useEffect(() => {
    // Load posts on initial render
    loadPosts();
    
    // Add event listener for focus to refresh posts data
    // This ensures changes (like upvotes) made on other pages are reflected
    window.addEventListener('focus', loadPosts);
    
    // Clean up
    return () => {
      window.removeEventListener('focus', loadPosts);
    };
  }, []);
  
  // Function to load posts data
  const loadPosts = () => {
    setPosts(getAllPosts());
  };
  
  // Filter posts based on search term and category
  const filteredPosts = posts.filter(post => {
    // Filter by search term
    const matchesSearchTerm = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = 
      activeCategory === 'all' || 
      post.category === activeCategory;
    
    return matchesSearchTerm && matchesCategory;
  });
  
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
    <div className="home-page">
      <div className="container">
        <div className="page-header">
          <h1>Campus Community Feed</h1>
          
          <div className="category-filter">
            <button 
              className={activeCategory === 'all' ? 'active' : ''} 
              onClick={() => setActiveCategory('all')}
            >
              All Posts
            </button>
            <button 
              className={activeCategory === 'course-review' ? 'active' : ''} 
              onClick={() => setActiveCategory('course-review')}
            >
              Course Reviews
            </button>
            <button 
              className={activeCategory === 'item-trade' ? 'active' : ''} 
              onClick={() => setActiveCategory('item-trade')}
            >
              Marketplace
            </button>
            <button 
              className={activeCategory === 'general' ? 'active' : ''} 
              onClick={() => setActiveCategory('general')}
            >
              General
            </button>
          </div>
          
          <div className="filters">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search posts..."
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
                <option value="upvotes">Most Upvoted</option>
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
            <p className="no-posts-message">
              {searchTerm 
                ? `No posts found matching "${searchTerm}"`
                : activeCategory !== 'all'
                  ? `No posts found in the selected category`
                  : "No posts available. Create the first one!"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage; 