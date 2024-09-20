// interface requires promise (not necessary for fetch all expenses)
// import { TotalExpensesData } from '../interfaces/TotalExpenses';
import Auth from '../utils/auth';

const retrieveTotalExpenses = async () => {
  try {
    const response = await fetch(
      '/api/expenses/total',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    );
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return [];
  }
};

export { retrieveTotalExpenses };