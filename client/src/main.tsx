import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';

// Our Pages
import LandingPage from './pages/LandingPage.tsx'
import Cashflow from './pages/Cashflow.tsx';
import Investment from './pages/Investment.tsx';
import Travel from './pages/Travel.tsx';
import About from './pages/AboutPage.tsx';
import Login from './pages/Login.tsx';
import CreateAccount from './pages/CreateAccountPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: '/home',
        element: <Cashflow />
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
      },
      {
        path: '/create-account',
        element: <CreateAccount />
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
