import { useQuery } from "@apollo/client";
import { GET_DIRECTORS_QUERY } from "../queries/queries";

export default function AddMovie() {
  const { loading, data, error } = useQuery(GET_DIRECTORS_QUERY);
  if (loading) return <option disabled>Loading ...</option>;
  if (error) return <option disabled>there is an error</option>;
  const renderDirectors = () => {
    return data.directors.map((director) => {
      return <option>{director.name}</option>;
    });
  };
  return (
    <form id="add-movie">
      <div>
        <label htmlFor="movie-name">Movie Name :</label>
        <input id="movie-name" name="movie-name" type="text" />
      </div>
      <div>
        <label htmlFor="genre">Genre :</label>
        <input id="genre" name="genre" type="text" />
      </div>
      <div>
        <label htmlFor="director">Director</label>
        <select id="director" name="director">
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
