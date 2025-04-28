import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost } from '../models/PostStore';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [category, setCategory] = useState('general');
  const [courseInfo, setCourseInfo] = useState({
    courseCode: '',
    professor: '',
    semester: '',
    rating: 5
  });
  const [itemInfo, setItemInfo] = useState({
    price: '',
    condition: 'Like New',
    location: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Get post details
    const post = getPostById(id);
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category || 'general');
      
      // Set image and preview if exists
      if (post.imageUrl) {
        setImage(post.imageUrl);
        setImagePreview(post.imageUrl);
      }
      
      // Set course info if exists
      if (post.courseInfo) {
        setCourseInfo(post.courseInfo);
      }
      
      // Set item info if exists
      if (post.itemInfo) {
        setItemInfo(post.itemInfo);
      }
      
      setIsLoading(false);
    } else {
      // Post not found, redirect to home
      navigate('/');
    }
  }, [id, navigate]);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Please select an image file (jpg, png, gif)');
      e.target.value = null; // Clear file input
      return;
    }
    
    // Validate file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size exceeds the 5MB limit. Please compress or resize your image before uploading.');
      e.target.value = null; // Clear file input
      return;
    }
    
    // Convert to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleCourseInfoChange = (e) => {
    const { name, value } = e.target;
    setCourseInfo((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleItemInfoChange = (e) => {
    const { name, value } = e.target;
    setItemInfo((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    // Get the appropriate info based on category
    let courseInfoData = null;
    let itemInfoData = null;
    
    if (category === 'course-review') {
      if (!courseInfo.courseCode || !courseInfo.professor || !courseInfo.semester) {
        setError('Course information is required');
        return;
      }
      courseInfoData = { ...courseInfo, rating: Number(courseInfo.rating) };
    } else if (category === 'item-trade') {
      if (!itemInfo.price || !itemInfo.location) {
        setError('Item information is required');
        return;
      }
      itemInfoData = itemInfo;
    }
    
    // Update post
    const updatedPost = updatePost(id, {
      title,
      content,
      imageUrl: image,
      category,
      courseInfo: courseInfoData,
      itemInfo: itemInfoData
    });
    
    if (updatedPost) {
      // Navigate to post detail page
      navigate(`/post/${id}`);
    } else {
      setError('Failed to update post');
    }
  };
  
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="edit-post-page">
      <div className="container">
        <h1>Edit Post</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="category">Post Category *</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="general">General Discussion</option>
              <option value="course-review">Course Review</option>
              <option value="item-trade">Marketplace Item</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
            />
          </div>
          
          {category === 'course-review' && (
            <div className="extra-fields">
              <h3>Course Information</h3>
              <div className="form-group">
                <label htmlFor="courseCode">Course Code *</label>
                <input
                  type="text"
                  id="courseCode"
                  name="courseCode"
                  value={courseInfo.courseCode}
                  onChange={handleCourseInfoChange}
                  placeholder="e.g. CS 5010"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="professor">Professor *</label>
                <input
                  type="text"
                  id="professor"
                  name="professor"
                  value={courseInfo.professor}
                  onChange={handleCourseInfoChange}
                  placeholder="e.g. Dr. Smith"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="semester">Semester *</label>
                <input
                  type="text"
                  id="semester"
                  name="semester"
                  value={courseInfo.semester}
                  onChange={handleCourseInfoChange}
                  placeholder="e.g. Fall 2023"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <select
                  id="rating"
                  name="rating"
                  value={courseInfo.rating}
                  onChange={handleCourseInfoChange}
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Good</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>
            </div>
          )}
          
          {category === 'item-trade' && (
            <div className="extra-fields">
              <h3>Item Details</h3>
              <div className="form-group">
                <label htmlFor="price">Price *</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={itemInfo.price}
                  onChange={handleItemInfoChange}
                  placeholder="e.g. $45"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="condition">Condition</label>
                <select
                  id="condition"
                  name="condition"
                  value={itemInfo.condition}
                  onChange={handleItemInfoChange}
                >
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Very Good">Very Good</option>
                  <option value="Good">Good</option>
                  <option value="Acceptable">Acceptable</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="location">Pickup Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={itemInfo.location}
                  onChange={handleItemInfoChange}
                  placeholder="e.g. Main Campus Library"
                  required
                />
              </div>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content"
              rows="6"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            <div className="file-input-help">
              Maximum file size: 5MB. Supported formats: JPG, PNG, GIF. 
              <br />
              <strong>Note:</strong> Using large or multiple images may cause storage limitations.
              For best performance, use compressed images.
            </div>
            
            {imagePreview && (
              <div className="image-preview">
                <p>Image Preview:</p>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                />
              </div>
            )}
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={() => navigate(`/post/${id}`)} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage; 