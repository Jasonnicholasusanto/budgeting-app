// rrd imports
import { Link, useLoaderData } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// components
import Landing from "../components/Landing.jsx";
import AddBudgetForm from "../components/AddBudgetForm.jsx";
import AddTransactionForm from "../components/AddTransactionForm.jsx";
import Table from "../components/Table";

//  helper functions
import { createBudget, createTransaction, deleteItem, fetchData, waitPromise } from "../helpers.js";
import BudgetItem from "../components/BudgetItem.jsx";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const transactions = fetchData("transactions");
  return { userName, budgets, transactions }
}

// Dashboard action
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  
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

    } catch (e) {
      throw new Error("There was a problem creating your budget.");
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

      return toast.success(`${values.transactionOption} - ${values.newTransaction} created!`);
    } catch (e) {
      throw new Error("There was a problem creating this transaction.");
    }
  }

  if (_action === "deleteTransaction") {
    try {

      deleteItem({
        key: "transactions",
        id: values.transactionId,
      });

      return toast.success("Transaction deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting the transaction.");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, transactions } = useLoaderData();

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

                    <h2>Existing Budgets</h2>

                    <div className="budgets">
                      {
                        budgets.map((budget) => (
                          <BudgetItem key={budget.id} budget={budget} />
                        ))
                      }
                    </div>

                    {
                      transactions && transactions.length > 0 && (
                        <div className="grid-md">
                          <h2>Recent Transactions</h2>
                          <Table transactions={
                            transactions.sort((a, b) => b.transactionDate - a.transactionDate).slice(0, 8)
                          } />
                          {transactions.length > 8 && (
                            <Link to="transactions" className="btn btn--dark">
                              View all transactions
                            </Link>
                          )}
                        </div>
                      )
                    }
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