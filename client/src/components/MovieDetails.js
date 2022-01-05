import React from "react";
import { useQuery } from "@apollo/client";
import { GET_MOVIE_QUERY } from "../queries/queries";
export default function MovieDetails(props) {
  const { loading, data, error } = useQuery(GET_MOVIE_QUERY, {
    variables: { id: props.selectedMovie },
  });

  const renderMovieDetails = () => {
    const { movie } = data || {};
    if (movie) {
      return (
        <div>
          <h3>{movie.name}</h3>
          <h3>{movie.genre}</h3>
          <p>Directed By : {movie.director.name}</p>
          <p>All movies by this director</p>
          <ul>
            {movie.director.movies.map((item) => {
              return <li>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else
      return (
        <div>
          <h3>no movies selected !</h3>!
        </div>
      );
  };
  return (
    <div>
      <h1>Output Movie Details</h1>
      <h2>{renderMovieDetails()}</h2>
    </div>
  );
}
