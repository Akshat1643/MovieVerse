import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Movie from "./components/Movie";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthProtectedRoute />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

const AuthProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <h2>Loading...</h2>;

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  } else {
    return <Movie />;
  }
};

export default App;
