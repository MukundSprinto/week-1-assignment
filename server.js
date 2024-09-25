import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import DataLoader from 'dataloader';
import { authorTypeDefs } from './graphql/schemas/Author.js';
import { AuthorResolver, batchAuthors } from './graphql/resolvers/Author.js';
import { bookTypeDefs } from './graphql/schemas/Book.js';
import { BookResolver, batchBooks } from './graphql/resolvers/Book.js';
import { bookReviewTypeDefs } from './graphql/schemas/BookReview.js';
import { BookReviewResolver } from './graphql/resolvers/BookReview.js';
import { authorDetailTypeDefs } from './graphql/schemas/AuthorDetail.js';
import { AuthorDetailResolver } from './graphql/resolvers/AuthorDetails.js';

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: [authorTypeDefs, bookTypeDefs, bookReviewTypeDefs, authorDetailTypeDefs],
  resolvers: [AuthorResolver, BookResolver, BookReviewResolver, AuthorDetailResolver],
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({
      token: req.headers.token,
      loaders: {
        author: new DataLoader(batchAuthors),
        book: new DataLoader(batchBooks),
      },
    }),
  }),
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});


await new Promise((resolve) => httpServer.listen({ port: 3000 }, resolve));

console.log(`🚀 Server ready at http://localhost:3000/`);
