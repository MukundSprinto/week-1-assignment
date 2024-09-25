import { Book } from '../../db-schema/postgres/Book.js';
import { Op } from 'sequelize';

const batchBooks = async (authorIds) => {
  const books = await Book.findAll({
    where: {
      author_id: {
        [Op.in]: authorIds,
      },
    },
  });
  return authorIds.map(id => books.filter(book => book.author_id === id));
};


const BookResolver = {
    Book: {
        author: async (book, _, context) => {
            if (!book.author_id) return null;
            return context.loaders.author.load(book.author_id);
        },
    },
    Query: {
        books: async (_, { filter, page=1, pageSize = 10}) => {
            const whereClause = {};
            
            if (filter) {
                if (filter.title) {
                    whereClause.title = { [Op.iLike]: `%${filter.title}%` };
                }
                if (filter.author_id) {
                    whereClause.author_id = filter.author_id;
                }
                if (filter.id) {
                    whereClause.id = filter.id;
                }
                if (filter.published_date_gt) {
                    whereClause.published_date = { ...whereClause.published_date, [Op.gte]: new Date(filter.published_date_gt) };
                }
                if (filter.published_date_lt) {
                    whereClause.published_date = { ...whereClause.published_date, [Op.lte]: new Date(filter.published_date_lt) };
                }
                if (filter.published_date_range) {
                    whereClause.published_date = { 
                        [Op.between]: [
                            new Date(filter.published_date_range.start), 
                            new Date(filter.published_date_range.end)
                        ] 
                    };
                }
            }

            const offset = (page - 1) * pageSize;
            
            const { rows, count } = await Book.findAndCountAll({
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
        createBook: async (_, { title, published_date, author_id, conver_image_uri }) => {
            published_date = new Date(published_date);
            console.log(published_date);
            return await Book.create({ title, published_date, author_id, conver_image_uri });
        },
        updateBook: async (_, { id, title, published_date, author_id, conver_image_uri }) => {
            const updateData = {};
            if (title) updateData.title = title;
            if (published_date) updateData.published_date = published_date;
            if (author_id) updateData.author_id = author_id;
            if (conver_image_uri) updateData.conver_image_uri = conver_image_uri;
            return await Book.update(updateData, { where: { id } });
        },
        deleteBook: async (_, { id }) => {
            return await Book.destroy({ where: { id } });
        }
    }
}

export { BookResolver, batchBooks };