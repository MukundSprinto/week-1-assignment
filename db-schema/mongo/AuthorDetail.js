import { mongoose } from '../../db/mongoose.js'


const authorDetailSchema = new mongoose.Schema({
    author_id: {
      type: Number,
      required: true
    },
    phone: {
      type: Number,
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    website: {
        type: String
    },
}, {
    timestamps: true,
});

const AuthorDetail = mongoose.model('AuthorDetail', authorDetailSchema);

export { AuthorDetail };
