import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import bcrypt from 'bcrypt';

interface UserAttributes {
    id: number;
    username: string;
    password: string;
  }
  
  interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
  
  export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public password!: string;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    // Hash the password before saving the user
    public async setPassword(password: string) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(password, saltRounds);
    }
  }
  
  export function UserFactory(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [8, 100], // Minimum length of 8 characters
          },
        },
      },
      {
        tableName: 'users',
        sequelize,
        hooks: {
          beforeCreate: async (user: User) => {
            await user.setPassword(user.password);
          },
          beforeUpdate: async (user: User) => {
            await user.setPassword(user.password);
          },
        }
      }
    );
  
    return User;
  }
  