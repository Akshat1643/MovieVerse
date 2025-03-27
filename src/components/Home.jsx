import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";  
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/Home.scss";

const Home = () => {
  const { logout, isAuthenticated,user } = useAuth0();  
  const navigate = useNavigate(); 

  const [Movie, setMovie] = useState("");
  const [SearchedMovie, setSearchedMovie] = useState("");
  const [data, setData] = useState([]);
  const [pageN0, setpageN0] = useState(1);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
  
    const apiResponse = async () => {
      try {
        const response = await axios.get("https://www.omdbapi.com/", {
          params: {
            s: Movie ? Movie : "2024",
            apikey: "c2af9ce0",
            page: pageN0,
          },
        });
        setData(response.data.Search || []);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
  
    apiResponse();
  }, [isAuthenticated, pageN0, Movie, navigate]);

  const handleChange = (e) => setMovie(e.target.value);
  const handleClick = () => {
    setSearchedMovie(Movie);
    setMovie("");
    setpageN0(1);
  };

  const handelHomebtn = () => {
    setSearchedMovie("");
    setpageN0(1);
  };

  return (
    <section className="container mb-2">
      <div className="text-center mt-5">
        <div className="container">
          <div className="navbar d-flex justify-content-between align-items-center">
            <h1>Movie-verse</h1>

            <h3>Welcome to movie-verse {user.name}</h3>
            <Button 
              variant="danger" 
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </Button>
          </div>
        </div>

      
        <div className="mb-3">
          <input
            type="text"
            className="form-control d-inline w-50"
            placeholder="Search movies..."
            onChange={handleChange}
            value={Movie}
          />
          <button className="btn btn-primary ms-2" onClick={handleClick}>
            Search
          </button>
        </div>
        {pageN0 > 1 && (
            <h1>{`page-no:${pageN0}`}</h1>
          )}
        <Button onClick={handelHomebtn} variant="primary">Home</Button>
        <p>Searching for: <strong>{Movie}</strong></p>

        <main>
          <div className="row row-cols-md-5 gy-4 gx-4">
            {data.map((movie) => (
              <div key={movie.imdbID} className="col d-flex flex-column gap-2  p-3 mr-2">
                <Card className="h-100 card">
                  <Card.Img className="poster" variant="top" src={movie.Poster} alt={movie.Title} />
                  <Card.Body className="d-flex flex-column border-0">
                    <Card.Title className="">{movie.Title}</Card.Title>
                    <Link to={`/movie/${movie.imdbID}`}>
                      <Button variant="primary">Watch Now</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-4 d-flex justify-content-center gap-3">
            <button className="btn btn-secondary px-3" onClick={() => setpageN0((prev) => Math.max(prev - 1, 1))} disabled={pageN0 === 1}>
              Previous
            </button>
            <button className="btn btn-secondary px-4" onClick={() => setpageN0((prev) => prev + 1)}>
              Next
            </button>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Home;
