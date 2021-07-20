import * as Sequelize       from 'sequelize';
import { Model, DataTypes } from 'sequelize';
export interface StateAttributes extends Model {
  id: number;
  key: string;
  value: string;
};

export default function initState(sequelize: Sequelize.Sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    key: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    value: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
  };
  return sequelize.define<StateAttributes>('state', attributes);
};