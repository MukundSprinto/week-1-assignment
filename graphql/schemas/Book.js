const bookTypeDefs = `#graphql
  type Book {
    id: Int
    title: String
    published_date: String
    author_id: Int
    conver_image_uri: String
    author: Author
    created_at: String
    updated_at: String
  }

  type BookConnection {
    edges: [Book]
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    totalCount: Int!
  }

  type Query {
    books(filter: BookFilter page: Int, pageSize: Int): BookConnection
  }

  input BookFilter {
    title: String
    author_id: Int
    id: Int
  }

  type Mutation {
    createBook(title: String!, published_date: String!, author_id: Int!, conver_image_uri: String!): Book!
    updateBook(id: Int!, title: String, published_date: String, author_id: Int, conver_image_uri: String): Book!
    deleteBook(id: Int!): Book!
  }
`;

export { bookTypeDefs };
