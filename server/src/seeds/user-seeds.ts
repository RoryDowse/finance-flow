import { User } from '../models/user';

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
  ]);
};
