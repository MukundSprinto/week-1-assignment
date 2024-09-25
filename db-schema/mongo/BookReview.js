import { mongoose } from '../../db/mongoose.js'


const bookReviewSchema = new mongoose.Schema({
  book_id: {
    type: Number,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  user_name: {
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
