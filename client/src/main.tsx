import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';

// Our Pages
import Cashflow from './pages/Cashflow.tsx';
import Expenses from './pages/Expenses.tsx';
import Investment from './pages/Investment.tsx';
import Travel from './pages/Travel.tsx';
import About from './pages/AboutPage.tsx';
import Login from './pages/Login.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Cashflow />
      },
      {
        path: '/expenses',
        element: <Expenses />
      },
      {
        path: '/investment',
        element: <Investment />
      },
      {
        path: '/travel',
        element: <Travel />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}
