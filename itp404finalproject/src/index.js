import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.min.css";

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import AddDestination from './routes/AddDestination';
import Destinations from './routes/Destinations';
import Visited from './routes/Visited';
import Favorites from './routes/Favorites';
import Dislikes from './routes/Dislikes';
import EditEntry from './routes/EditEntry';
import AddEntry from './routes/AddEntry';
import Place from './routes/Place';
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/adddestination",
        element: <AddDestination />,
      },
      {
        path: "/viewdestinations",
        element: <Destinations />,
      },
      {
        path: "/entries",
        element: <Visited />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/dislikes",
        element: <Dislikes />,
      },
      {
        path: "/entries/:entryId",
        element: <Place />,
        loader: async ({ params }) => {
          const entryResponse = await fetch(`http://localhost:4000/entries/${params.entryId}`);
          const entry = await entryResponse.json();

          const userResponse = await fetch(`http://localhost:4000/users/${entry.userId}`);
          const user = await userResponse.json();

          return { user, entry };
        }
      },
      {
        path: "/addentry",
        element: <AddEntry />,
      },
      {
        path: "/entries/:entryId/edit",
        element: <EditEntry />,
        loader({ params }) {
          return fetch(`http://localhost:4000/entries/${params.entryId}`).then((response) => {
            return response.json();
          })
        }
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
