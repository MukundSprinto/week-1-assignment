const typeDefs = `#graphql

  type Book {
    title: String
    author: String
    description: String
  }

  type Query {
    books: [Book]
  }
`;

const books = [
    {
        title: 'The Awakening',
        description: 'The Awakening is a novel by Kate Chopin published in 1899. It is the story of a woman named Edna Pontellier who is dissatisfied with her life as a wife and mother. She begins to question her traditional beliefs and values and starts to explore her own identity and desires.',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        description: 'City of Glass is a novel by Paul Auster published in 1989. It is the first book in the "New York Trilogy" and follows the story of three strangers who become entangled in a mystery involving a missing person and a secret society.',
        author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        books: () => books,
    },
};


export { typeDefs, resolvers };