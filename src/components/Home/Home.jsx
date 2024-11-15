import React from 'react'
import bg2 from './../../assets/bg2.jpg';
import { Footer } from '../Footer/Footer';
import movie1 from './../../assets/movie1.jpg';
import movie2 from './../../assets/movie2.jpg';
import movie3 from './../../assets/movie3.jpg';

const Home = () => {
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
            <input 
              type="text" 
              className="form-control w-50" 
              placeholder="Search for movies, actors, genres..." 
            />
            <button className="btn ms-2" style={{ background: 'orange' }}>Search</button>
          </div>
        </div>
      </div>

      {/* Featured Categories Section */}
      <div className="container py-5">
        <h2 className="text-center mb-4">Featured Movie Categories</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img src={movie1} className="card-img-top" alt="Action Movies" style={{ height: '500px', objectFit: 'cover' }}/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src={movie2} className="card-img-top" alt="Drama Movies" style={{ height: '500px', objectFit: 'cover' }}/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src={movie3} className="card-img-top" alt="Comedy Movies" style={{ height: '500px', objectFit: 'cover' }}/>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Home;
