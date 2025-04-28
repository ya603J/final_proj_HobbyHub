import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="app-header">
      <div className="container">
        <h1 className="logo">
          <Link to="/">CampusHub</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">Course Reviews</Link>
            </li>
            <li>
              <Link to="/marketplace">Marketplace</Link>
            </li>
            <li>
              <Link to="/create" className="create-button">Create Post</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 