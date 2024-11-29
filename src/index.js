import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './screens/HomePage.js';
import MoviesPage from './screens/MoviesPage.js';
import ScreeningsPage from './screens/ScreeningsPage.js';
import GroupsPage from './screens/GroupsPage.js';
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
    element: <HomePage />
  },
  {
    path: "/movies",
    element: (
      <MovieFilterProvider>
        <MoviesPage />
      </MovieFilterProvider>
    ),
  },
  {
    path: "/screenings",
    element: <ScreeningsPage />,
  },
  {
    path: "/groups",
    element: <GroupsPage />, // Placeholder for the Groups page
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
