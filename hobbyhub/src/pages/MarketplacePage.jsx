import { useState, useEffect } from 'react';
import { getAllPosts } from '../models/PostStore';
import PostCard from '../components/PostCard';

const MarketplacePage = () => {
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
    // Only load marketplace posts
    const allPosts = getAllPosts();
    const marketplaceItems = allPosts.filter(post => post.category === 'item-trade');
    setPosts(marketplaceItems);
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
    <div className="marketplace-page">
      <div className="container">
        <div className="page-header">
          <h1>Campus Marketplace</h1>
          <p className="page-description">
            Buy, sell, or trade items with other students. From textbooks to furniture,
            find what you need or sell what you don't at student-friendly prices.
          </p>
          
          <div className="filters">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search items..."
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
                <option value="upvotes">Most Popular</option>
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
              <h3>No items currently listed</h3>
              <p>
                {searchTerm 
                  ? `No items match "${searchTerm}". Try a different search term.` 
                  : "Be the first to list an item! Help fellow students find what they need."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage; 