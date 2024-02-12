import logo from './logo.svg';
import React, { useContext, useEffect, useRef } from 'react';
import './App.css';
import './styles/styles.scss'
import { useDispatch, useSelector } from 'react-redux';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import MainHome from './cmps/MainHome/MainHome';


import { socket, SocketContext } from './context/socket';
import io from "socket.io-client";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <MainHome />
      </div>
    ),
  },
  {
    path: "/item",
    element: (
      <div>

      </div>
    ),
  },
  {
    path: "/item:itemId",
    element: (
      <div>

      </div>
    ),
  },
  {
    path: "/login",
    element: <div>

    </div>,
  },
  {
    path: "/signup",
    element: <div>

    </div>,
  },
]);


function App() {
  const dispatch = useDispatch();
 
  useEffect(() => {

  }, [])

  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
