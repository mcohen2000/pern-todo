import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  // useRouteError,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./components/Home/Home";
import Register from "./components/Users/Register";
import Login from "./components/Users/Login";
import UserLists from "./components/UserLists/UserLists";


// const Error = () => {
//   const err = useRouteError();
//   console.log("ERROR!!!", err);
//   return (
//     <div className='errorWrapper'>
//       <h2>Error</h2>
//       <p>
//         Oh no, something went wrong! If you believe this was a mistake please
//         email us...
//       </p>
//       <p>
//         Go back to the <a href='/'>homepage.</a>
//       </p>
//     </div>
//   );
// };

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route path='/' element={<Home />} />
      <Route path='/lists' element={<UserLists />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Route>
  )
);

function App() {
  
  return (
      <RouterProvider router={router} />
  );
}

export default App;
