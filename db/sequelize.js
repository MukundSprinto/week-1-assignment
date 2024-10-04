import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: console.log,
});

try {
    await sequelize.authenticate();
    console.log('Postgres connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the postgres database:', error);
}

export { sequelize };
