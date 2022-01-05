import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_DIRECTORS_QUERY, ADD_MOVIE_MUTATION } from "../queries/queries";

export default function AddMovie() {
  //Defining States
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [directorID, setDirectorID] = useState("");
  //Getting Data from the query
  const { loading, data, error } = useQuery(GET_DIRECTORS_QUERY);
  const [addMovie] = useMutation(ADD_MOVIE_MUTATION);
  if (loading) return <option disabled>Loading ...</option>;
  if (error) return <option disabled>there is an error</option>;
  const renderDirectors = () => {
    return data.directors.map((director) => {
      return <option>{director.name}</option>;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie({
      variables: { name: name, genre: genre, directorId: directorID },
    });
  };

  return (
    <form id="add-movie" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="movie-name">Movie Name :</label>
        <input
          id="movie-name"
          name="movie-name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="genre">Genre :</label>
        <input
          id="genre"
          name="genre"
          type="text"
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="director">Director</label>
        <select
          id="director"
          name="director"
          onChange={(e) => setDirectorID(e.target.value)}
        >
          <option>Select a Director</option>
          {renderDirectors()}
        </select>
      </div>
      <div>
        <button type="submit">Add a new movie</button>
      </div>
    </form>
  );
}
