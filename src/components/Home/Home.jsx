import React, { useState } from 'react';
import bg2 from './../../assets/bg2.jpg';
import { Footer } from '../Footer/Footer';
import moviePlaceholder from './../../assets/movie1.jpg';
import axios from 'axios';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a movie title to search.');
      return;
    }
  
    setError('');
    setLoading(true);
  
    try {
      const response = await axios.get(
        `http://localhost:8000/api/recommend/?title=${encodeURIComponent(searchQuery)}`
      );
      setRecommendedMovies(response.data); // No need for `response.json()` with Axios
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch recommendations.');
    } finally {
      setLoading(false);
    }
  };
  

  const fetchSuggestions = async (query) => {
    if (!query.trim()) return;

    try {
      const response = await axios.get(
        `http://localhost:8000/api/suggest/?query=${encodeURIComponent(query)}`
      );
      setSuggestions(response.data); // Directly use response data
    } catch (err) {
      console.error('Failed to fetch suggestions:', err);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div 
        className="hero-section bg-dark text-white text-center py-5"
        style={{
          backgroundImage: `url(${bg2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: "100%",
          height: "50vh", 
          position: "relative", 
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%", 
            backgroundColor: "rgba(0, 0, 0, 0.6)", 
            zIndex: 1,
          }}
        ></div>

        <div className="container position-relative z-index-2" style={{ zIndex: 2, height: "100%" }}>
          <h1 className="display-4">Discover Your Next Favorite Movie</h1>
          <p className="lead mb-4">Get personalized movie recommendations based on your tastes</p>
          <div className="d-flex justify-content-center">
            <div className="position-relative">
              <input 
                type="text" 
                className="form-control w-100" 
                placeholder="Search for movies, actors, genres..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  fetchSuggestions(e.target.value);
                }}
              />
              {suggestions.length > 0 && (
                <ul className="list-group position-absolute w-100" style={{ top: '100%', zIndex: 3 }}>
                  {suggestions.map((suggestion, index) => (
                    <li 
                      key={index} 
                      className="list-group-item"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setSuggestions([]);
                      }}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button 
              className="btn ms-2" 
              style={{ background: 'orange' }}
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          {error && <p className="text-danger mt-3">{error}</p>}
        </div>
      </div>

      {/* Recommendations Section */}
      {loading ? (
        <div className="text-center my-5">
          <p>Loading recommendations...</p>
        </div>
      ) : recommendedMovies.length > 0 ? (
        <div className="container py-5">
          <h2 className="text-center mb-4">Recommended Movies</h2>
          <div className="row">
            {recommendedMovies.map((movie, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card">
                  <img 
                    src={movie.image || moviePlaceholder} 
                    className="card-img-top" 
                    alt={movie.title} 
                    style={{ height: '400px', objectFit: 'cover' }} 
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">{movie.description || 'No description available.'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center my-5">
          <p>No recommendations found. Try searching for another movie.</p>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Home;
