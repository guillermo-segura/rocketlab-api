'use strict';
import { Sequelize, DataTypes } from 'sequelize';
import fs from 'fs'; 
import path from 'path';

const basename = path.basename(__filename);
const db: any = {};

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'src/database/database.sqlite',
});

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;