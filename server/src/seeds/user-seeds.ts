import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    {
      username: 'testuser1',
      password: 'hashedpassword1', // Hash the password if necessary
    },
    {
      username: 'testuser2',
      password: 'hashedpassword2',
    },
    // Add more users here...
  ], { individualHooks: true });
};
