import { DataTypes, Model } from 'sequelize';
import { User } from './user.js';
export class Expense extends Model {
}
export function ExpenseFactory(sequelize) {
    Expense.init({
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
                isDate: true,
            }
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
        tableName: 'expenses',
        sequelize,
        timestamps: false,
    });
    return Expense;
}
