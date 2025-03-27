import React from "react";
import "../styles/Movie.scss";
import LoginButton from "./LoginButton";

const Movie = () => {
  return (
    <section className="MovieSection">
      <div className="content">
        <h1>Watchly</h1>
        <h3>Your Ultimate Movie Hub!</h3>
        <p>
          Watchly is your go-to platform for all movie lovers! Whether you're into Hollywood blockbusters, indie films, or international cinema, Watchly brings everything to your fingertips.
        </p>
        <h5>Step into the world of unlimited entertainment.</h5>
        <LoginButton className="login-btn" />
      </div>
    </section>
  );
};

export default Movie;
