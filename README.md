[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Finance Flow

## Description

This application aims to help users manage cash flow for making informed decisions about investments and travel. The app features financial projections based on stock market and currency data, allowing users to assess future investment or travel possibilities. Secure login ensures the privacy of financial data, and the project incorporates the Alpha Vantage API for stock data and the Exchange Rate API for currency projections. The project's core components involve a user-friendly interface for tracking income and expenses, showing cash flow, and producing long-term financial projections. The backend is built using Node, Express, PostgreSQL, Sequelize, JWT for authentication, and bcrypt for secure password storage. The frontend utilizes React with Bootstrap for styling. Agile methodologies, including daily stand-ups and sprint reviews, were used to ensure steady progress.

Deployed Link: https://finance-flow-f2zu.onrender.com

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

Follow these steps to install and run the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd your-repository
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**:
   ```bash
   DB_HOST=localhost
   DB_USER=username
   DB_PASSWORD=password
   DB_NAME=your-database
   JWT_SECRET=your_jwt_secret
   ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
   EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key
   ```
5. **Set Up the Database**:

- **Connect to the Database**:
  ```bash
  psql -U postgres
  ```
- **Create the Database**:

  ```bash
  -- DROP DATABASE
  DROP DATABASE IF EXISTS cashflow_db;

  -- CREATE DATABASE
  CREATE DATABASE cashflow_db;
  ```

- **Run the Seed Script**:
  ```bash
  npm run seed
  ```

6. **Start the Backend**:
   ```bash
   npm start
   ```
7. **Access the Application**:

   ```bash
   http://localhost:3001
   ```

## Usage

Follow these steps to use the application:

1. **Create an Account**:

   - Navigate to the registration page.
   - Enter your username, create a password, and complete the signup process.

2. **Log in**:

   - Go to the login page.
   - Enter your registered username and password to access your account.

3. **View Income and Expenses**:

   - After logging in, you will be directed to the dashboard.
   - View income
   - View expenses

4. **View Cash Flow**:

   - The dashboard will display the current cash flow based on the income and expenses.

5. **Generate Investment Projections**:

   - Navigate to the "Investment" page.
   - Enter the ticker symbol of the stock you want to view.
   - The app will fetch data using the Alpha Vantage API to provide stock market forecasts based on 10-year historic performance data.

6. **Analyze Projections**:

   - Review the projections to assess potential investment outcomes.
   - Adjust your investments or travel plans accordingly.

7. **Generate Currency Projections**:

   - Navigate to the "Currency Exchange" page.
   - Enter the symbol of the base and target currencies you want to view.
   - The app will fetch data using the Exchange Rate API to provide currency forecasts based on the current exchange rate.

8. **Analyze Projections**:

   - Adjust your investments or travel plans accordingly.

9. **Log Out**:
   - When you have finished using the app, log out to ensure your account remains secure.

![Screenshot](/client/src/assets/images/screenshot.png)

## License

This project is licensed under the MIT license.

## Contributing

**Team Members:**

- Cameron Barfuss
- Rory Dowse

**Guidance:**

- Chris Baird
- Jerome Chenette
- James Harding
- Erik Hoversten
- Charles Puente
- Alistair Rowden
- Luis Sanchez
- Kyle Vance

## Tests

1. **Manual Testing:**

   - Run your development server:
     ```bash
     npm start
     ```
   - Open your browser and navigate to `http://localhost:3001`.
   - Test different components and functionalities:
     - Verify navigation links and page redirections.
     - Check that forms render correctly and validate inputs.

2. **React Hooks and State Management:**
   - Interact with the application to ensure state management and hooks (e.g., `useState`) are working properly:
     - Test input fields to verify state updates.
     - Confirm that validation errors are shown as expected.

## Questions

Please visit my GitHub profile: https://github.com/RoryDowse.<br>

Please visit Cameron Barfuss's GitHub profile: https://github.com/Runnerrupert.<br>

For additional questions, please contact me at: rorydowse@hotmail.com.
