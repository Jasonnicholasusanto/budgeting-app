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
import { deletePlan } from "./actions/deletePlan";

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import TransactionsPage, { transactionsAction, transactionsLoader } from "./pages/TransactionsPage";
import PlanPage, { planAction, planLoader } from "./pages/PlanPage";

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
        path: "budget/:id",
        element: <PlanPage />,
        loader: planLoader,
        action: planAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deletePlan,
          },
        ],
      },
      {
        path: "saving/:id",
        element: <PlanPage />,
        loader: planLoader,
        action: planAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deletePlan,
          },
        ],
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