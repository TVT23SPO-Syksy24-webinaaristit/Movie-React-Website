import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './screens/Home.js';
import Movies from './screens/Movies.js';
import Screenings from './screens/Screenings.js';
import Groups from './screens/Groups.js';
import ProfilePage from './screens/ProfilePage.js';
import LoginPage from './screens/LoginPage.js';
import { Navigate } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MovieFilterProvider from './contexts/MovieFilterProvider.js';
import UserProvider from './contexts/UserProvider.js';
// import dotenv from 'dotenv';
// import routes from './routers/router.js';

const environment = process.env.NODE_ENV
// dotenv.config()
const isLoggedIn = false; // Placeholder auth logic

//Router setup
const router = createBrowserRouter([
  {
    // Error handling route can be added here
    // errorElement: <ErrorPage />
  },
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/movies",
    element: (
      <MovieFilterProvider>
        <Movies />
      </MovieFilterProvider>
    ),
  },
  {
    path: "/screenings",
    element: <Screenings />,
  },
  {
    path: "/groups",
    element: <Groups />, // Placeholder for the Groups page
  },
  {
    path: "/profile",
    element: isLoggedIn ? <ProfilePage /> : <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
