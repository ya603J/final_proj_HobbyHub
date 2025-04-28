import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="home-link">Go to Home</Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 