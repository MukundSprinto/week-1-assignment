const bookTypeDefs = `#graphql
  type Book {
    id: Int
    title: String
    published_date: String
    description: String
    author_id: Int
    cover_image_uri: String
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
    published_date_gt: String
    published_date_lt: String
    published_date_range: DateRange
  }

  input DateRange {
    start: String!
    end: String!
  }

  type Mutation {
    createBook(title: String!, description: String!, published_date: String!, author_id: Int!, cover_image_uri: String!): Book!
    updateBook(id: Int!, title: String, description: String, published_date: String, author_id: Int, cover_image_uri: String): Book!
    deleteBook(id: Int!): Book!
  }
`;

export { bookTypeDefs };
