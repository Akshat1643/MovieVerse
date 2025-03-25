import React from "react";
import "../styles/Movie.scss";
import LoginButton from "./LoginButton";
const Movie = () => {

  return (
    <section className="container-fluid MovieSection pt-5">
      <div className="text-center container">
        <h1>Movie-Verse</h1>
        <h3>Your Ultimate Movie Hub!</h3>
        <br />
        <p>
          Movie-Verse is a one-stop platform for all movie lovers! Whether you're a fan of Hollywood blockbusters, indie films, or international cinema, Movie-Verse brings everything to your fingertips.
        </p>
        <div>
            <h5>Welcome to the world of movies , you are one step closer to enjoy the endless world </h5>
          <LoginButton/>
        </div>
      </div>

     
        
    </section>
  );
};

export default Movie;
