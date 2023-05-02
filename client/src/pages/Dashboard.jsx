// rrd imports
import { Link, useLoaderData } from "react-router-dom";
import React, { useEffect, useState } from "react";

// library imports
import { toast } from "react-toastify";

// components
import Landing from "../components/Landing.jsx";
import AddPlanForm from "../components/AddPlanForm.jsx";
import AddTransactionForm from "../components/AddTransactionForm.jsx";
import Table from "../components/Table";

//  helper functions
import { createPlan, createTransaction, createUser, deleteItem, fetchData, getSubscriptions, waitPromise } from "../helpers.js";
import BudgetItem from "../components/BudgetItem.jsx";
import SavingItem from "../components/SavingItem.jsx";
import { getAllMatchingItems } from "../helpers.js";

// loader to load all the user's data
export function dashboardLoader() {
  const user = fetchData("users");
  const plans = fetchData("plans");
  const transactions = fetchData("transactions");

  return { user, plans, transactions }
}

// Dashboard actions
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  
  await waitPromise();

  // Creating a new user
  if (_action === "newUser") {
    try {
      createUser({
        userName: values.userName,
        currencyChoice: values.currency
      })

      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error("There was a problem creating your account.")
    }
  }

  // Creating a new plan
  if (_action === "createPlan") {
    try {
      createPlan({
        name: values.newPlan,
        planType: values.newPlanType,
        amount: values.newPlanAmount,
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        currency: values.currency
      })

      return toast.success(`${values.newPlan} ${values.newPlanType} created!`);

    } catch (e) {
      throw new Error("There was a problem creating your plan.");
    }
  }

  // Creating a new transaction
  if (_action === "createTransaction") {
    try {
      createTransaction({
        transactionType: values.transactionOption,
        recurring: values.recurringTransaction,
        name: values.newTransaction,
        amount: values.newTransactionAmount,
        planId: values.newTransactionPlan,
        transactionDate: values.transactionDate,
        currency: values.currency
      })

      return toast.success(`${values.transactionOption} - ${values.newTransaction} created!`);
    } catch (e) {
      throw new Error("There was a problem creating this transaction.");
    }
  }


  // Deleting a transaction
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
  const { user, plans, transactions } = useLoaderData();

  const subscriptions = getSubscriptions(transactions);

  const [userName, setUserName] = useState(null);
  const [currencyChoice, setCurrencyChoice] = useState(null);

  useEffect(() => {
    if (user !== null) {
      setUserName(user[0].userName);
      setCurrencyChoice(user[0].currencyChoice);
    }
  }, [user]);

  const budgets = (plans && plans.length > 0) ? plans.filter(plan => plan.planType === 'Budget') : [];
  const savings = (plans && plans.length > 0) ? plans.filter(plan => plan.planType === 'Saving') : [];

  return (
    <>
      {user ? (
        <div className="dashboard">
          <h1>Welcome, <span className="accent">{userName}</span></h1>
    
          <div className="grid-sm">
            {
              (plans && plans.length) > 0
                ? (
                  <div className="grid-lg">
                    <div className="flex-lg">
                      <AddPlanForm currency={currencyChoice}/>
                      <AddTransactionForm plans={plans} currency={currencyChoice}/>
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
                      subscriptions && subscriptions.length > 0 && (
                        <div className="grid-md">
                          <h2>Your subscriptions</h2>
                          <Table transactions={
                            subscriptions.sort((a, b) => b.createdAt - a.createdAt).sort((a, b) => b.transactionDate - a.transactionDate).slice(0, 8)
                          }/>
                          {subscriptions.length > 8 && (
                            <Link to="subscriptions" className="btn btn--dark">
                              View all subscriptions
                            </Link>
                          )}
                        </div>
                      )
                    }

                    {
                      transactions && transactions.length > 0 && (
                        <div className="grid-md">
                          <h2>Your Transactions</h2>
                          <Table transactions={
                            transactions.filter(transaction => (transaction.transactionType === "Expense" || transaction.transactionType === "Income")).sort((a, b) => b.createdAt - a.createdAt).sort((a, b) => b.transactionDate - a.transactionDate).slice(0, 8)
                          }/>
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
                    <p className="introText">Create a budget or savings plan to get started!</p>
                    <AddPlanForm currency={currencyChoice}/>
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