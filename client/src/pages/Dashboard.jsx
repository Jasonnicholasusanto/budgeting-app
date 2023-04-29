// rrd imports
import { Link, useLoaderData } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// components
import Landing from "../components/Landing.jsx";
import AddPlanForm from "../components/AddPlanForm.jsx";
import AddTransactionForm from "../components/AddTransactionForm.jsx";
import Table from "../components/Table";

//  helper functions
import { createPlan, createTransaction, deleteItem, fetchData, waitPromise } from "../helpers.js";
import BudgetItem from "../components/BudgetItem.jsx";
import SavingItem from "../components/SavingItem.jsx";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const plans = fetchData("plans");
  const transactions = fetchData("transactions");
  return { userName, plans, transactions }
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

  if (_action === "createPlan") {
    try {
      createPlan({
        name: values.newPlan,
        planType: values.newPlanType,
        amount: values.newPlanAmount,
        dateFrom: values.dateFrom,
        dateTo: values.dateTo
      })

      return toast.success(`${values.newPlan} ${values.newPlanType} created!`);

    } catch (e) {
      throw new Error("There was a problem creating your plan.");
    }
  }

  if (_action === "createTransaction") {
    try {
      createTransaction({
        transactionType: values.transactionOption,
        recurring: values.recurringTransaction,
        name: values.newTransaction,
        amount: values.newTransactionAmount,
        planId: values.newTransactionPlan,
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
  const { userName, plans, transactions } = useLoaderData();

  const budgets = (plans && plans.length > 0) ? plans.filter(plan => plan.planType === 'Budget') : [];
  const savings = (plans && plans.length > 0) ? plans.filter(plan => plan.planType === 'Saving') : [];

  console.log(transactions);

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>Welcome, <span className="accent">{userName}</span></h1>
          <div className="grid-sm">
            {
              (plans && plans.length) > 0
                ? (
                  <div className="grid-lg">
                    <div className="flex-lg">
                      <AddPlanForm />
                      <AddTransactionForm plans={plans} />
                    </div>

                    {budgets && budgets.length > 0 && 
                      <>
                        <h2>Your Budget Plans</h2>

                        <div className="budgets">
                          {
                            budgets.map((budget) => (
                              <BudgetItem key={budget.id} budget={budget} />
                            ))
                          }
                        </div>
                      </>
                    }

                    {savings && savings.length > 0 && 
                      <>
                        <h2>Your Saving Plans</h2>

                        <div className="budgets">
                          {
                            savings.map((saving) => (
                              <SavingItem key={saving.id} saving={saving} />
                            ))
                          }
                        </div>
                      </>
                    }

                    {
                      transactions && transactions.length > 0 && (
                        <div className="grid-md">
                          <h2>Recent Transactions</h2>
                          <Table transactions={
                            transactions.sort((a, b) => b.createdAt - a.createdAt).sort((a, b) => b.transactionDate - a.transactionDate).slice(0, 8)
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
                    <p className="introText">Create a budget or savings plan to get started!</p>
                    <AddPlanForm />
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