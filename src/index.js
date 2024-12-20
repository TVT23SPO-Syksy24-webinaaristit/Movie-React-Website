import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './screens/HomePage.js';
import MoviesPage from './screens/MoviesPage.js';
import MovieDetailsPage from './screens/MovieDetailsPage.js';
import ScreeningsPage from './screens/ScreeningsPage.js';
import { GroupProvider } from './contexts/GroupProvider.js';
import GroupPage from './screens/GroupPage.js';
import GroupDetailsPage from './screens/GroupDetailsPage.js';
import ProfilePage from './screens/ProfilePage.js';
import LoginPage from './screens/LoginPage.js';
import { Navigate } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MovieFilterProvider from './contexts/MovieFilterProvider.js';
import UserProvider from './contexts/UserProvider.js';
import ProtectedRoute from './components/Authentication/ProtectedRoute.js';
import { FavoriteProvider } from './contexts/FavoriteProvider.js';
import ThemeProvider from './contexts/ThemeProvider.js';
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
      <GroupProvider>
        <MovieFilterProvider>
          <FavoriteProvider>
            <MoviesPage />
          </FavoriteProvider>
        </MovieFilterProvider>
      </GroupProvider>
    ),
  },
  {
    path: "/movies/:id",
    element: <MovieDetailsPage />
  },
  {
    path: "/groups", //To be moved under the protected routes once auth is ready.
    element: (
      <GroupProvider>
        <GroupPage />
      </GroupProvider>
    )
  },
  {

    path: "/groupdetails/:id",
    element: (
      <GroupProvider>
        <GroupDetailsPage />
      </GroupProvider>
    )
  },
  {

    path: "/screenings",
    element: (
      <GroupProvider>
        <ScreeningsPage />
      </GroupProvider>
    )


  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/profile",
        element: (
          <FavoriteProvider>
            <ProfilePage />,
          </FavoriteProvider>
        )
      }
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/profile/:accounts_idaccount?",
        element: (
          <FavoriteProvider>
            <ProfilePage />
          </FavoriteProvider>
        )
      }
    ]
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
      <ThemeProvider>
        <FavoriteProvider>
          <RouterProvider router={router} />
        </FavoriteProvider>
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
