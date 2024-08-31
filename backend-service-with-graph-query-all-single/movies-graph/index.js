import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";

const port = 4000;
const apiUrl = "http://localhost:3030";

const typeDefs = gql`
    type Movie {
        id: ID!
        name: String
        duration: Int
        genre: String
        views: Int
    }
    type Query {
        movie(id: ID!): Movie
        movies: [Movie]
    }
`;

const resolvers = {
    Query: {
        movie(_, { id }) {
            return fetch(`${apiUrl}/movies/${id}`).then(res => res.json());
        },
        movies() {
            return fetch(`${apiUrl}/movies`).then(res => res.json());
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen({ port }).then(({ url }) => {
    console.log(`Movies Graph has successfully started and listening at ${url}`);
});