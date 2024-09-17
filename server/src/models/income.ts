import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user';

interface IncomeAttributes {
    id: string; // UUID
    amount: number;
    assignedUserId: string; // UUID
}

interface IncomeCreationAttributes extends Optional<IncomeAttributes, 'id'> {}

export class Income extends Model<IncomeAttributes, IncomeCreationAttributes> implements IncomeAttributes {
    public id!: string;
    public amount!: number;
    public assignedUserId!: string;
}

export function IncomeFactory(sequelize: Sequelize): typeof Income {
    Income.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
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
            assignedUserId: {
                type: DataTypes.UUID,
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