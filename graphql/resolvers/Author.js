import { Op } from 'sequelize';
import { Author } from '../../db-schema/postgres/Author.js';

const batchAuthors = async (authorIds) => {
    const authors = await Author.findAll({
      where: {
        id: {
            [Op.in]: authorIds,
        },
      },
    });
    return authorIds.map(id => authors.find(author => author.id === id) || null);
};

const AuthorResolver = {
    Author: {
        books: async (author, _, context) => {
            return context.loaders.book.load(author.id);
        },
    },
    Query: {
        authors: async (_, { filter, page = 1, pageSize = 10 }) => {
            const whereClause = {};
            
            if (filter) {
                if (filter.name) {
                    whereClause.name = { [Op.iLike]: `%${filter.name}%` };
                }
                if (filter.id) {
                    whereClause.id = filter.id;
                }
            }

            const offset = (page - 1) * pageSize;
            
            const { rows, count } = await Author.findAndCountAll({
                where: whereClause,
                limit: pageSize,
                offset: offset,
            });

            return {
                edges: rows,
                pageInfo: {
                    hasNextPage: offset + rows.length < count,
                    totalCount: count,
                },
            };
        }
    },
    Mutation: {
        createAuthor: async (_, { name, biography, born_date, profile_image_uri }) => {
            born_date = new Date(born_date);
            console.log(born_date);
            return await Author.create({ name, biography, born_date, profile_image_uri });
        },
        updateAuthor: async (_, { id, name, biography, born_date, profile_image_uri }) => {
            const updateData = {};
            if (name) updateData.name = name;
            if (biography) updateData.biography = biography;
            if (born_date) updateData.born_date = born_date;
            if (profile_image_uri) updateData.profile_image_uri = profile_image_uri;
            
            return await Author.update(updateData, { where: { id } });
        },
        deleteAuthor: async (_, { id }) => {
            return await Author.destroy({ where: { id } });
        }
    }
}

export { AuthorResolver, batchAuthors };