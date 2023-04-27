// rrd imports
import { useLoaderData } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// components
import Landing from "../components/Landing.jsx";
import AddBudgetForm from "../components/AddBudgetForm.jsx";
import AddTransactionForm from "../components/AddTransactionForm.jsx";

//  helper functions
import { createBudget, createTransaction, fetchData, waitPromise } from "../helpers.js";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets }
}

// action
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  const loading = new Promise(resolve => setTimeout(resolve, 1000));
  
  await waitPromise();

  // new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName))
      return toast.success(`Welcome, ${values.userName}`)
    } catch (e) {
      throw new Error("There was a problem creating your account.")
    }
  }

  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
        dateFrom: values.dateFrom,
        dateTo: values.dateTo
      })

      return toast.success(`${values.newBudget} budget created!`);
      // return toast.promise(
      //   loading,
      //   {
      //     pending: 'Creating new budget...',
      //     success: `${values.newBudget} budget created!`,
      //     error: 'Error creating new budget 😱'
      //   }
      // );
    } catch (e) {
      throw new Error("There was a problem creating your budget.")
    }
  }

  if (_action === "createTransaction") {
    try {
      createTransaction({
        transactionType: values.transactionOption,
        recurring: values.recurringTransaction,
        name: values.newTransaction,
        amount: values.newTransactionAmount,
        budgetId: values.newTransactionBudget,
        transactionDate: values.transactionDate
      })
      return toast.success(`${values.transactionOption} - ${values.newTransaction} created!`)
    } catch (e) {
      throw new Error("There was a problem creating this transaction.")
    }
  }
}

const Dashboard = () => {
  const { userName, budgets } = useLoaderData()

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>Welcome, <span className="accent">{userName}</span></h1>
          <div className="grid-sm">
            {
              budgets && budgets.length > 0
                ? (
                  <div className="grid-lg">
                    <div className="flex-lg">
                      <AddBudgetForm />
                      <AddTransactionForm budgets={budgets} />
                    </div>
                  </div>
                )
                : (
                  <div className="grid-xs">
                    {/* <p>Personal budgeting is the secret to financial freedom.</p> */}
                    <p className="introText">Create a budget to get started!</p>
                    <AddBudgetForm />
                  </div>
                )
            }
          </div>
        </div>
      ) : <Landing />}
    </>
  )
}
export default Dashboard