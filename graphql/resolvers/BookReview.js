import { Mongoose } from 'mongoose';
import { BookReview } from '../../db-schema/mongo/BookReview.js';
import { Book } from '../../db-schema/postgres/Book.js';

const BookReviewResolver = {
    Query: {
        bookReviews: async (_, { book_id }) => {
            return BookReview.find({ book_id });
        },
    },
    Mutation: {
        createBookReview: async (_, { book_id, review, rating, user_name }) => {
            const bookReview = await BookReview.findOne({ book_id, user_name });
            if (bookReview) {
                throw new Error('Book review already exists');
            }
            const book = await Book.findOne({ where: { id: book_id } });
            if (!book) {
                throw new Error('Book not found');
            }
            return BookReview.create({ book_id, review, rating, user_name });
        },
        updateBookReview: async (_, { id, review, rating, user_name }) => {
            const updateData = {};
            if (review) updateData.review = review; 
            if (rating) updateData.rating = rating;
            if (user_name) updateData.user_name = user_name;
            return BookReview.updateOne({ _id: id }, updateData);
        },
        deleteBookReview: async (_, { id }) => {
            return BookReview.deleteOne({ _id: id });
        },
    },
};

export { BookReviewResolver };
