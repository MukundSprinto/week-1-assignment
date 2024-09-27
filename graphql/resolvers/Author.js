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
                if (filter.born_date_gt) {
                  whereClause.born_date = { ...whereClause.born_date, [Op.gte]: new Date(filter.born_date_gt) };
                }
                if (filter.born_date_lt) {
                  whereClause.born_date = { ...whereClause.born_date, [Op.lte]: new Date(filter.born_date_lt) };
                }
                if (filter.born_date_range) {
                  whereClause.born_date = { 
                    [Op.between]: [
                      new Date(filter.born_date_range.start), 
                      new Date(filter.born_date_range.end)
                    ] 
                  };
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
            return await Author.create({ name, biography, born_date, profile_image_uri });
        },
        updateAuthor: async (_, { id, name, biography, born_date, profile_image_uri }) => {
            const updateData = {};
            if (name) updateData.name = name;
            if (biography) updateData.biography = biography;
            if (born_date) updateData.born_date = born_date;
            if (profile_image_uri) updateData.profile_image_uri = profile_image_uri;
            
            const res = await Author.update(updateData, { where: { id }, returning: true, plain: true  });
            if (Array.isArray(res) && res.length > 1) {
              return res[1].dataValues;
          } else {
              return null;
          }
        },
        deleteAuthor: async (_, { id }) => {
            return await Author.destroy({ where: { id } });
        }
    }
}

export { AuthorResolver, batchAuthors };