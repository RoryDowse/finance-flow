import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js';

interface ExpenseAttributes {
    id: number; 
    amount: number;
    description?: string;
    priority: 'High' | 'Medium' | 'Low';
    date: Date;
    assignedUserId: number; 
}

interface ExpenseCreationAttributes extends Optional<ExpenseAttributes, 'id'> {}

export class Expense extends Model<ExpenseAttributes, ExpenseCreationAttributes> implements ExpenseAttributes {
    public id!: number;
    public amount!: number;
    public description?: string;
    public priority!: 'High' | 'Medium' | 'Low';
    public date!: Date;
    public assignedUserId!: number;
}

export function ExpenseFactory(sequelize: Sequelize): typeof Expense {
    Expense.init(
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
            priority: {
                type: DataTypes.ENUM('High', 'Medium', 'Low'),
                allowNull: false,
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
        },
        {
            tableName: 'expenses',
            sequelize,
            timestamps: false,
        }
    );

    return Expense;
}