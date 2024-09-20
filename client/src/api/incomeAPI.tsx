import Auth from '../utils/auth.ts';

const retrieveTotalIncome = async () => {
  try {
    const response = await fetch(
      '/api/income/total',
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

export { retrieveTotalIncome };