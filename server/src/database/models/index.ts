import { Sequelize, Dialect } from 'sequelize';
import initState              from './state';

const env = process.env.NODE_ENV || 'development';
const config = require('./../config')[env];
const dialect: Dialect = 'mysql';
const pool = {
    max: 100,
    min: 0,
    idle: 10000,
    evict: 10000,
}

const sequelize = new Sequelize(config.database, config.username, config.password, {dialect, pool, logging: false});

const db = {
    sequelize,
    Sequelize,
    State: initState(sequelize)
};

Object.values(db).forEach( (model: any) => {
    if (model.associate) model.associate(db);
});

export default db;