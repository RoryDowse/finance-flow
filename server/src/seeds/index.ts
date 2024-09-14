import sequelize from '../config/connection.js' 

const seedAll = async (): Promise<void> => {
  try {

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
