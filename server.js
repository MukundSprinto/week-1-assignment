import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs, resolvers } from './graphql/schema.js';
// import { sequelize } from './db/sequelize.js';
// import { Author } from './db-schema/postgres/Author.js';
// import { Book } from './db-schema/postgres/Book.js';
import { AuthorDetail } from './db-schema/mongo/AuthorDetail.js';
import { BookReview } from './db-schema/mongo/BookReview.js';

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

await new Promise((resolve) => httpServer.listen({ port: 3000 }, resolve));

console.log(`🚀 Server ready at http://localhost:3000/`);
