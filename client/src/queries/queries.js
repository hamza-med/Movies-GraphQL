import { gql } from "@apollo/client";

const GET_MOVIES_QUERY = gql`
  {
    movies {
      name
      genre
      id
    }
  }
`;
const GET_DIRECTORS_QUERY = gql`
  {
    directors {
      name
      age
      id
    }
  }
`;
export { GET_MOVIES_QUERY, GET_DIRECTORS_QUERY };
