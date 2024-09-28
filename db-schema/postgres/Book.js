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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    cover_image_uri: {
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

await Book.sync({ alter: true });

export { Book };
