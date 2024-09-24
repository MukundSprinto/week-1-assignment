import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/sequelize.js'


const Book = sequelize.define(
  'Book',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    published_date: {
      type: DataTypes.DATE,
    },
    author_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Authors',
        key: 'id',
      },
      allowNull: false,
    },
    conver_image_uri: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {

  },
);

// console.log(Book === sequelize.models.Book);
await Book.sync();

export { Book };
