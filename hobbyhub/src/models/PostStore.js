// PostStore.js - Manages post data in local storage

import Post from './Post';
import Comment from './Comment';

// Maximum number of posts to store in localStorage to prevent quota issues
const MAX_POSTS = 20;

// Load posts from localStorage or use default posts
const loadPosts = () => {
  try {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      return JSON.parse(savedPosts);
    }
  } catch (error) {
    console.error("Error loading posts from localStorage:", error);
    // Clear localStorage if there's a parsing error
    localStorage.removeItem('posts');
  }
  
  // Default posts if none exist
  return [
    new Post(
      "1", 
      "CS 5010: Programming Design Paradigm Review", 
      "This course is an excellent introduction to programming paradigms. The professor explains concepts clearly and the assignments are challenging but rewarding. I particularly enjoyed the functional programming section.",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "general",
      null,
      null,
      Date.now() - 86400000, // 1 day ago
      8,
      [new Comment("1", "I took this course last semester and agree completely!", Date.now() - 43200000)]
    ),
    new Post(
      "2", 
      "Selling Calculus 3 Textbook - Great Condition", 
      "Selling my Calculus 3 textbook from last semester. Barely used and in excellent condition. Can meet on campus for exchange.",
      "https://images.unsplash.com/photo-1576872381149-7847515ce5d8?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "general",
      null,
      null,
      Date.now() - 43200000, // 12 hours ago
      3,
      [new Comment("2", "Is the price negotiable? I'm interested.", Date.now() - 21600000)]
    ),
    new Post(
      "3", 
      "INFO 6150: Web Design and UX Engineering Review", 
      "This course provides a solid foundation in web design principles and UX engineering. The projects are practical and relevant to industry needs. Professor is knowledgeable and responsive to questions.",
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "course-review",
      { 
        courseCode: "INFO 6150", 
        professor: "Dr. Johnson", 
        semester: "Spring 2023", 
        rating: 4.0 
      },
      null,
      Date.now() - 172800000, // 2 days ago
      6,
      []
    ),
    new Post(
      "4", 
      "Looking for Study Group - Data Structures", 
      "I'm taking CS 5800 Data Structures this semester and looking for a study group. Would be great to collaborate on problem sets and prepare for exams together.",
      "",
      "general",
      null,
      null,
      Date.now() - 21600000, // 6 hours ago
      4,
      [
        new Comment("3", "I'm in the same class! Let's connect.", Date.now() - 18000000),
        new Comment("4", "There's already a study group that meets on Thursdays at the library. DM me for details.", Date.now() - 14400000)
      ]
    ),
  ];
};

let posts = loadPosts();

// Compress image if it's a base64 data URL
const compressImageIfNeeded = (imageData) => {
  if (!imageData || !imageData.startsWith('data:image')) {
    return imageData; // Not a base64 image or no image
  }
  
  // For URLs, just return as is
  if (imageData.startsWith('http')) {
    return imageData;
  }
  
  // We'll reduce quality for JPEG/PNG base64 images
  try {
    return imageData;
    // More advanced compression would go here,
    // but for this project we'll just limit the number of posts
  } catch (error) {
    console.error("Error compressing image:", error);
    return imageData;
  }
};

// Save posts to localStorage
const savePosts = () => {
  try {
    // Limit posts to prevent localStorage quota issues
    const postsToSave = posts.slice(0, MAX_POSTS);
    localStorage.setItem('posts', JSON.stringify(postsToSave));
  } catch (error) {
    console.error("Error saving posts to localStorage:", error);
    
    // If we hit quota limit, try removing older posts
    if (error.name === 'QuotaExceededError') {
      const reducedPosts = posts.slice(0, Math.max(5, posts.length / 2));
      try {
        localStorage.setItem('posts', JSON.stringify(reducedPosts));
        console.log("Saved with reduced number of posts to avoid quota issues");
        posts = reducedPosts; // Update the posts array to match what we saved
      } catch (innerError) {
        console.error("Still couldn't save posts after reduction:", innerError);
      }
    }
  }
};

export const getAllPosts = () => {
  return [...posts];
};

export const getPostById = (id) => {
  return posts.find(post => post.id === id);
};

export const addPost = (title, content = "", imageUrl = "", category = "general", courseInfo = null, itemInfo = null) => {
  // Compress the image if it's a base64 string
  const processedImageUrl = compressImageIfNeeded(imageUrl);
  
  const newPost = new Post(
    Date.now().toString(),
    title,
    content,
    processedImageUrl,
    category,
    courseInfo,
    itemInfo
  );
  
  // Add new post to the beginning of the array
  posts = [newPost, ...posts];
  
  // Limit posts array to prevent localStorage issues
  if (posts.length > MAX_POSTS) {
    posts = posts.slice(0, MAX_POSTS);
  }
  
  savePosts();
  return newPost;
};

export const updatePost = (id, updates) => {
  const index = posts.findIndex(post => post.id === id);
  if (index !== -1) {
    // Process image if it's in the updates
    if (updates.imageUrl) {
      updates.imageUrl = compressImageIfNeeded(updates.imageUrl);
    }
    
    posts[index] = { ...posts[index], ...updates };
    savePosts();
    return posts[index];
  }
  return null;
};

export const deletePost = (id) => {
  const index = posts.findIndex(post => post.id === id);
  if (index !== -1) {
    posts = posts.filter(post => post.id !== id);
    savePosts();
    return true;
  }
  return false;
};

export const addComment = (postId, text) => {
  const post = getPostById(postId);
  if (post) {
    const newComment = new Comment(Date.now().toString(), text);
    post.comments = [newComment, ...post.comments];
    savePosts();
    return newComment;
  }
  return null;
};

export const upvotePost = (id) => {
  const index = posts.findIndex(post => post.id === id);
  if (index !== -1) {
    // Create a new object with incremented upvotes to ensure React detects the change
    posts[index] = {
      ...posts[index],
      upvotes: posts[index].upvotes + 1
    };
    savePosts();
    // Return a copy of the updated post
    return {...posts[index]};
  }
  return null;
};

// Initialize localStorage with default posts if needed
if (!localStorage.getItem('posts')) {
  savePosts();
} 