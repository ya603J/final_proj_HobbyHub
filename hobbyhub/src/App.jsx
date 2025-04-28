import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';

// Pages
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import MarketplacePage from './pages/MarketplacePage';
import CreatePostPage from './pages/CreatePostPage';
import PostDetailPage from './pages/PostDetailPage';
import EditPostPage from './pages/EditPostPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
            <Route path="/edit/:id" element={<EditPostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} CampusHub - Connect, Share, Trade</p>
            <div className="footer-links">
              <a href="#">About</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Contact</a>
            </div>
            <p className="footer-disclaimer">For verified university students only. All post content represents the views of individual users.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
