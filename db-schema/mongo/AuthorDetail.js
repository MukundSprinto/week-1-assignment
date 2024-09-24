import { mongoose } from '../../db/mongoose.js'


const authorDetailSchema = new mongoose.Schema({
    authorId: {
      type: Number,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
}, {
    timestamps: true,
});

const AuthorDetail = mongoose.model('AuthorDetail', authorDetailSchema);

export { AuthorDetail };
