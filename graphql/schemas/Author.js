const authorTypeDefs = `#graphql
  type Author {
    id: Int
    name: String
    biography: String
    born_date: String
    profile_image_uri: String
    books: [Book]
    created_at: String
    updated_at: String
  }

  type AuthorConnection {
    edges: [Author]
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    totalCount: Int!
  }

  type Query {
    authors(filter: AuthorFilter, page: Int, pageSize: Int): AuthorConnection
  }

  type Mutation {
    createAuthor(name: String!, biography: String!, born_date: String!, profile_image_uri: String!): Author!
    updateAuthor(id: Int!, name: String, biography: String, born_date: String, profile_image_uri: String): Author!
    deleteAuthor(id: Int!): Author!
  }

  input AuthorFilter {
    name: String
    id: Int
  }
`;

export { authorTypeDefs };
