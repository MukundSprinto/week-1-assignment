import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/sequelize.js'


const Author = sequelize.define(
  'Author',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
    },
    born_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    profile_image_uri: {
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

// console.log(Author === sequelize.models.Author);
await Author.sync();

export { Author };
