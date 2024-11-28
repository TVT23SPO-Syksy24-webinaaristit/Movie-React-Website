import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './screens/Home.js';
import Movies from './screens/Movies.js';
import ScreeningsPage from './screens/ScreeningsPage.js';
import ProfilePage from './screens/ProfilePage.js';
// import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MovieFilterProvider from './contexts/MovieFilterProvider.js';

const router = createBrowserRouter([
  {
    //errorElement: <ErrorPage/>
  },
  {
    path: "/",
    element: (
      <MovieFilterProvider>
        <Home />
      </MovieFilterProvider>
      )
  },
  {
    path: "/movies",
    element: (
    <MovieFilterProvider>
      <Movies />
    </MovieFilterProvider>
    )
  },
  {
  path: "/screeningspage",
  element: <ScreeningsPage />
  },
  {
    path: "/profilepage",
    element: <ProfilePage />
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <UserProvider> */}
      <RouterProvider router={router} />
    {/* </UserProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
