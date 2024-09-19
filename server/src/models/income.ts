import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js';

interface IncomeAttributes {
    id: number; 
    amount: number;
    description?: string;
    date: Date;
    assignedUserId: number; 
}

interface IncomeCreationAttributes extends Optional<IncomeAttributes, 'id'> {}

export class Income extends Model<IncomeAttributes, IncomeCreationAttributes> implements IncomeAttributes {
    public id!: number;
    public amount!: number;
    public description?: string;
    public date!: Date;
    public assignedUserId!: number;
}

export function IncomeFactory(sequelize: Sequelize): typeof Income {
    Income.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    isFloat: true,
                    min: 0.01,
                }
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                    isDate: true,}
            },
            assignedUserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: User,
                    key: 'id',
                },
            },
        }, {
            sequelize,
            tableName: 'income',
            timestamps: false,
        }
    );

    return Income;
}