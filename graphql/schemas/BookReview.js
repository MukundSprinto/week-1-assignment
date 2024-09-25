const bookReviewTypeDefs = `#graphql
  type BookReview {
    id: ID
    book_id: Int
    review: String
    user_name: String
    rating: Int
  }

  type Query {
    bookReviews(book_id: Int): [BookReview]
  }

  type Mutation {
    createBookReview(
        book_id: Int!
        user_name: String!
        review: String!
        rating: Int!
    ): BookReview!

    updateBookReview(
        id: ID!
        user_name: String
        review: String
        rating: Int
    ): BookReview!

    deleteBookReview(id: ID!): BookReview!
  }
`;

export { bookReviewTypeDefs };
