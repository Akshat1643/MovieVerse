import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/Home.scss";
import UncontrolledExample from "./HeroCarousel";

const Home = () => {
  const { logout, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  const [movie, setMovie] = useState("");
  const [searchedMovie, setSearchedMovie] = useState("");
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [home, sethome] = useState("null")

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await axios.get("https://www.omdbapi.com/", {
          params: {
            s: movie || "2024",
            apikey: "c2af9ce0",
            page: pageNo,
          },
        });
        sethome("null")
        console.log(response.data.Search)
        setData(response.data.Search || []);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [isAuthenticated, pageNo, movie, navigate]);

  const handleChange = (e) => setMovie(e.target.value);

  const handleClick = () => {
    setSearchedMovie(movie);
    setMovie("");
    setPageNo(1);
  };

  const handleHomeBtn = () => {
    setMovie("");
    setPageNo(1);
    sethome("1")
  };

  return (
    <section className="container-fluid hero_section">
      <div className="text-center container">
        <nav>
          <div className="header container">
            <h1 className="WATCHLY">WATCHLY</h1>
            <div className="headerInput">
              <input
                type="text"
                className="form-control d-inline"
                placeholder="Search movies..."
                onChange={handleChange}
                value={movie}
              />
            </div>
            <div className="d-flex align-items-center gap-3">
              <Button className="px-5" onClick={handleHomeBtn} variant="primary">Home</Button>
              <Button className="px-5" variant="danger" onClick={() => logout({ returnTo: window.location.origin })}>Logout</Button>
            </div>
          </div>
        </nav>
          
        {/* <div className="pt-3">
          <input
            type="text"
            className="form-control d-inline w-50"
            placeholder="Search movies..."
            onChange={handleChange}
            value={movie}
          />
          <button className="btn btn-primary ms-2" onClick={handleClick}>Search</button>
        </div> */}
        <div className="heroCarousel">
              <UncontrolledExample
                data={data}
              />
          </div>

        
        <p>Searching for: <strong>{movie}</strong></p>

        <main>
          <div className="row row-cols-md-5 gy-4 gx-4">
            {data.map((movie) => (
              <div key={movie.imdbID} className="col d-flex flex-column gap-2 p-3">
                <Card className="h-100 card  movie_cards">
                  <Card.Img className="poster" variant="top" src={movie.Poster} alt={movie.Title} />
                  <Card.Body className="d-flex flex-column border-0">
                    <Card.Title>{movie.Title}</Card.Title>
                    <Link to={`/movie/${movie.imdbID}`}>
                      <Button className="mt-4" variant="danger">Watch Now</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
          {pageNo > 1 && <h1 style={{color: "white"}}>{`Page No: ${pageNo}`}</h1>}
          <div className="mt-4 d-flex justify-content-center gap-3">
            <button className="btn btn-danger px-3" onClick={() => setPageNo((prev) => Math.max(prev - 1, 1))} disabled={pageNo === 1}>Previous</button>
            <button className="btn btn-secondary px-4" onClick={() => setPageNo((prev) => prev + 1)}>Next</button>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Home;