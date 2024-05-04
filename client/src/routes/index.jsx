import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="App">
      <div className="landing-view">
        <div className="left-text">
          <h2>The super fast<br></br>Falling stars<br></br>Pattern Generator!</h2>
          <p>Create your own React falling stars patterns with ease. <br></br>Be inspired by created users artwork and make your own!</p>
          <button className="get-started-button">
            <Link to="/create-artwork">Start the Generator!</Link>
          </button>
          <button className="green-button">
            <Link to="/artwork-collection">Artwork Collection</Link>
          </button>
        </div>

        <div className="right-image">
          <video src="hero-video-1.mov" alt="Line Pattern Generator" autoPlay loop muted/>
        </div>
      </div>
    </div>
  );
}

export default Home;
