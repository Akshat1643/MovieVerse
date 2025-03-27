import Carousel from "react-bootstrap/Carousel";
import "../styles/HeroCarousel.scss";

function HeroCarousel({ data }) {
  console.log(data); 

  return (
    <div className="movie-carousel-container ">
      <Carousel interval={3000} indicators={true}>
        {data.length > 0 ? (
          data.map((movie) => (
            <Carousel.Item key={movie.imdbID}>
              <div className="carousel-item-content">
                <img
                  className="movie-poster"
                  src={movie.Poster}
                  alt={movie.Title}
                />
                <Carousel.Caption>
                  <h3 className="movie-title">{movie.Title}</h3>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))
        ) : (
          <div className="no-movies">No movies available</div>
        )}
      </Carousel>
    </div>
  );
}

export default HeroCarousel;
