const authorDetailTypeDefs = `#graphql
  type AuthorDetail {
    author_id: Int
    phone: Float
    address: String
    email: String
    website: String
    created_at: String
    updated_at: String
  }

  type Query {
    authorDetails(author_id: Int): AuthorDetail
  }

  type Mutation {
    createAuthorDetail(
        author_id: Int!
        phone: Float!
        address: String
        email: String
        website: String
    ): AuthorDetail!

    updateAuthorDetail(
        author_id: Int!
        phone: Float
        address: String
        email: String
        website: String
    ): AuthorDetail!

    deleteAuthorDetail(author_id: Int!): AuthorDetail!
  }
`;

export { authorDetailTypeDefs };
