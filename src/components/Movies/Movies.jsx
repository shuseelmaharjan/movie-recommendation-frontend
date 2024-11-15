import React from 'react';
import movie1 from './../../assets/movie1.jpg';
import movie2 from './../../assets/movie2.jpg';
import movie3 from './../../assets/movie3.jpg';

const Movies = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Movies List</h2>
      <div className="row">
        {/* Movie 1 */}
        <div className="col-md-4 mb-4">
          <img src={movie1} alt="Movie 1" className="img-fluid w-100" style={{ height: '500px', objectFit: 'cover' }}/>
        </div>
        {/* Movie 2 */}
        <div className="col-md-4 mb-4">
          <img src={movie2}alt="Movie 2" className="img-fluid w-100" style={{ height: '500px', objectFit: 'cover' }}/>
        </div>
        {/* Movie 3 */}
        <div className="col-md-4 mb-4">
          <img src={movie3} alt="Movie 3" className="img-fluid w-100" style={{ height: '500px', objectFit: 'cover' }}/>
        </div>
      </div>
    </div>
  );
};

export default Movies;
