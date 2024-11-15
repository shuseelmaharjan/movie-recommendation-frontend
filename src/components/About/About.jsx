import React from 'react';
import developerImage from './../../assets/developer.jpg'; 
import { Footer } from '../Footer/Footer';

const About = () => {
  return (
    <>
    <div className="container py-5">
      <h2 className="text-center mb-4">About the Developer</h2>
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <img 
            src={developerImage} 
            alt="Developer" 
            className="img-fluid rounded-circle mb-3" 
            style={{ maxWidth: '200px', height: 'auto' }}
          />
          {/* Developer Info */}
          <h4 className="mb-3">Developer</h4>
          <p className="lead">
            Hi, I'm Aryan Malla, a passionate web developer with a love for creating modern, user-friendly applications. With years of experience in React, JavaScript, and web technologies, I aim to build innovative solutions that provide value to users. This project is a part of my journey to continuously learn and improve.
          </p>
          <p>
            I'm always excited to collaborate on new projects and contribute to open-source initiatives.
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default About;
