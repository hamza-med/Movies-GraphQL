//The schema will describe the data on this kind of graph
const graphql = require("graphql");
const Movie = require("../models/movie"); //Movie collection
const Director = require("../models/director"); //Director model to interact with the
//associated collection

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = graphql;
const _ = require("lodash");

// const movies = [
//   { id: "1", name: "star_wars", genre: "science_fiction", directorId: "1" },
//   { id: "2", name: "saw", genre: "horror", directorId: "2" },
//   { id: "3", name: "spiderMan", genre: "superNatural", directorId: "2" },
// ];
// const directors = [
//   { id: "1", name: "SOUSOU", age: 23 },
//   { id: "2", name: "hamma", age: 21 },
//   { id: "3", name: "hammzaHamza", age: 20 },
// ];

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        console.log(parent);
        //each movie has one director
        return Director.findById(parent.directorId);
        //return _.find(directors, { id: parent.directorId });
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        //each director has a lot of movies
        return Movie.find({ directorId: parent.id });
        //return _.filter(movies, { directorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movie.findById(args.id);
        // return _.find(movies, { id: args.id });
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Director.findById(args.id);
        //return _.find(directors, { id: args.id });
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve() {
        return Movie.find({}); //without any criteria they all match(empty object)
        //return movies;
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve() {
        return Director.find({}); //without any criteria they all match(empty object)
        //return directors;
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let director = new Director({
          name: args.name,
          age: args.age,
        });
        return director.save();
      },
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let movie = new Movie({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
        });
        return movie.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
