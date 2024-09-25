import { AuthorDetail } from '../../db-schema/mongo/AuthorDetail.js';
import { Author } from '../../db-schema/postgres/Author.js';

const AuthorDetailResolver = {
    Query: {
        authorDetails: async (_, { author_id }) => {
            return AuthorDetail.findOne({ author_id });
        },
    },
    Mutation: {
        createAuthorDetail: async (_, { author_id, phone, address, email, website }) => {
            const existingAuthorDetail = await AuthorDetail.findOne({ author_id });
            if (existingAuthorDetail) {
                throw new Error('Author detail already exists');
            }
            const author = await Author.findOne({ where: { id: author_id } });
            if (!author) {
                throw new Error('Author not found');
            }
            return AuthorDetail.create({ author_id, phone, address, email, website });
        },
        updateAuthorDetail: async (_, { author_id, phone, address, email, website }) => {
            const updateData = {};
            if (phone) updateData.phone = phone;
            if (address) updateData.address = address;
            if (email) updateData.email = email;
            if (website) updateData.website = website;
            return AuthorDetail.updateOne({ author_id }, updateData);
        },
        deleteAuthorDetail: async (_, { author_id }) => {
            return AuthorDetail.deleteOne({ author_id });
        },
    },
};

export { AuthorDetailResolver };
