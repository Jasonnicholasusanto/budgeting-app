import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Library imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts imports
import MainLayout, { mainLoader } from "./layouts/MainLayout";

// Actions imports
import { logoutAction } from "./actions/logoutAction";

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import TransactionsPage, { transactionsAction, transactionsLoader } from "./pages/TransactionsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: "transactions",
        element: <TransactionsPage />,
        loader: transactionsLoader,
        action: transactionsAction,
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },
]);

function App() {
  return <div className="App">
    <RouterProvider router={router} />
    <ToastContainer />
  </div>;
}

export default App;