import { mongoose } from '../../db/mongoose.js'


const bookReviewSchema = new mongoose.Schema({
  bookId: {
    type: Number,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
}, {
    timestamps: true,
});

const BookReview = mongoose.model('BookReview', bookReviewSchema);

export { BookReview };
