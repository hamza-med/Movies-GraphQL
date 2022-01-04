import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_MOVIES_QUERY = gql`
  {
    movies {
      name
      genre
      id
    }
  }
`;

export default function MovieList() {
  const { loading, data, error } = useQuery(GET_MOVIES_QUERY);
  if (loading) return <p>Loading ...</p>;
  const renderMovies = () => {
    return data.movies.map((movie) => {
      return <li key={movie.id}>{movie.name}</li>;
    });
  };
  return (
    <div>
      <ul>
        <li>{renderMovies()}</li>
      </ul>
    </div>
  );
}
