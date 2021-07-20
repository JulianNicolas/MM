import db from '../database/models';

export const connectDatabase = async () => {
  await db.sequelize.authenticate();
  console.info('\x1b[32m', "[MySQL] Connected");
};

/**
 * Close the database connection. 
 */
export const closeDatabase = async () => {
    await db.sequelize.close();
};

/**
 * Remove all the data for all db collections.  
 */
export const clearDatabase = async () => {
  await db.sequelize.truncate();
};