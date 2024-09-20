import { DataTypes, Model } from 'sequelize';
import { User } from './user.js';
export class Income extends Model {
}
export function IncomeFactory(sequelize) {
    Income.init({
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
        sequelize,
        tableName: 'income',
        timestamps: false,
    });
    return Income;
}
