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
    input MovieInput {
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
    type Mutation {
        createMovie(movie: MovieInput): Movie!
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
    },
    Mutation: {
        createMovie(root, args, ctx) {
            const { movie } = args;
            const headers = {
                "Content-Type": "application/json"
            }
            fetch(`${apiUrl}/movies`, {
                method: "post",
                body: JSON.stringify(movie),
                headers
            })
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.log(err))
            return movie;
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