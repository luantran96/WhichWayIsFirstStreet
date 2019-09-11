import * as dotenv from 'dotenv';
import Sequelize from 'sequelize';
dotenv.config();

class db {
  public db: Sequelize;
  public tableName: string;

  constructor() {
    this.db = new Sequelize(
      'postgres',
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
    
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      },
    );
  }

  public async findOne(selectors = {}) {
    
  }
}