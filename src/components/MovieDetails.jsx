import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/MovieDetail.scss"; 

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get("https://www.omdbapi.com/", {
          params: {
            i: id, 
            apikey: "c2af9ce0",
          },
        });
        setMovie(response.data); 
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <section className="container mt-5">
      {movie ? (
        <Card className="movie-details-card shadow-lg">
          <div className="row g-4">
           
            <div className="col-md-4 d-flex align-items-center">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="img-fluid rounded movie-poster"
              />
            </div>

           
            <div className="col-md-8">
              <Card.Body>
                <h2 className="text-primary">{movie.Title} ({movie.Year})</h2>
                <p className="text-muted">{movie.Genre} | {movie.Runtime}</p>
                <p className="lead">{movie.Plot}</p>

                <ul className="list-unstyled">
                  <li><strong>Director:</strong> {movie.Director}</li>
                  <li><strong>Actors:</strong> {movie.Actors}</li>
                  <li><strong>IMDB Rating:</strong>  {movie.imdbRating}/10</li>
                  <li><strong>Awards:</strong>  {movie.Awards || "N/A"}</li>
                  <li><strong>Box Office:</strong>  {movie.BoxOffice || "N/A"}</li>
                  <li><strong>Released:</strong>  {movie.Released}</li>
                  <li><strong>Language:</strong>  {movie.Language}</li>
                </ul>

                <div className="mt-3">
                  <Link to="/home">
                    <Button className="px-5" variant="danger" size="lg">Back</Button>
                  </Link>
                </div>
              </Card.Body>
            </div>
          </div>
        </Card>
      ) : (
        <p className="text-center">Loading movie details...</p>
      )}
    </section>
  );
};

export default MovieDetails;
