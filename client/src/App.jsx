import './app.scss'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Home from './pages/Home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Item from './pages/item/Item'
import MyItems from './pages/Myitems/MyItems'
import Profile from './pages/profile/Profile'


function App() {
  const Layout = () => {
    return (
      <div className='app'>
        <Navbar />
        <Outlet />
        {/* <Footer /> */}
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },

        {
          path: "/singleItem/:id",
          element: <Item />
        },
        {
          path: "/Myitems",
          element: <MyItems />
        },
        {
          path: "/profile",
          element: <Profile />
        },
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

