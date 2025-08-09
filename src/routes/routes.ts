import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Layout from "../layouts";

export const APP_ROUTER = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children:[
        {
            path: '/',
            Component: Home
        }
    ]
  },
]);
