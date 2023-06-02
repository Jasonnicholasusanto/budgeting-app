// rrd imports
import { Link, useLoaderData } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

// library imports
import { toast } from "react-toastify";

// components
import Landing from "../components/Landing.jsx";
import AddPlanForm from "../components/AddPlanForm.jsx";
import AddTransactionForm from "../components/AddTransactionForm.jsx";
import Table from "../components/Table";

//  helper functions
import { createAsset, createPlan, createTransaction, createUser, deleteItem, fetchData, formatDateToLocaleString, getUpcomings, getTransactions, sendUserToZapier, waitPromise } from "../helpers.js";
import BudgetItem from "../components/BudgetItem.jsx";
import SavingItem from "../components/SavingItem.jsx";
import { getAllMatchingItems } from "../helpers.js";
import AssetItem from "../components/AssetItem.jsx";

// loader to load all the user's data
export function dashboardLoader() {
  const user = fetchData("users");
  const plans = fetchData("plans");
  const assets = fetchData("assets");
  const transactions = fetchData("transactions");

  return { user, plans, assets, transactions }
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
        email: values.email,
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

  // Creating a new Asset plan
  if (_action === "createAsset") {
    try {
      createAsset({
        name: values.newAsset,
        assetType: values.newAccountType,
        balance: values.newBalance,
        bankName: values.bankName,
        createdOn: values.createdOn,
        currency: values.currency,
        accountNumber: values.accountNumber,
        bsbNumber: values.bsbNumber,
        interestRate: values.interestRate
      })

      return toast.success(`${values.newAsset} Asset created!`);

    } catch (e) {
      throw new Error("There was a problem creating your asset plan.");
    }
  }

  // Creating a new transaction
  if (_action === "createTransaction") {
    try {
      createTransaction({
        transactionType: values.transactionOption,
        transactionUpcomingType: values.transactionOption === "Upcoming" ? values.upcomingTransaction : "nil",
        name: values.newTransaction,
        amount: values.newTransactionAmount,
        planId: values.newTransactionPlan ? values.newTransactionPlan : "none",
        assetId: values.newTransactionAsset ? values.newTransactionAsset : "none",
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

      const itemDeleted = await getAllMatchingItems({
        category: "transactions",
        key: "id",
        value: values.transactionId,
      })[0];

      deleteItem({
        key: "transactions",
        id: values.transactionId,
      });

      if(itemDeleted.transactionType === "Upcoming"){
        return toast.success("Upcoming Payment deleted!");
      }
      
      return toast.success("Transaction deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting the transaction.");
    }
  }
}

const Dashboard = () => {
  const { user, plans, assets, transactions } = useLoaderData();

  const upcomings = getUpcomings(transactions);
  const filteredTransactions = getTransactions(transactions);

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

          <div className="dashboardHeading">
            <h1>Welcome, <span className="accent">{userName}</span></h1>
          </div>
    
          <div className="grid-sm">
            {
              (plans && plans.length || assets && assets.length) > 0
                ? (
                  <div className="grid-lg">
                    <div className="flex-lg">
                      <AddPlanForm currency={currencyChoice}/>
                      <AddTransactionForm assets={assets} plans={plans} currency={currencyChoice}/>
                    </div>

                    {assets && assets.length > 0 && 
                      <>
                        <h2>Your Bank Accounts</h2>

                        <div className="budgets">
                          {
                            assets.map((asset) => (
                              <AssetItem key={asset.id} asset={asset} />
                            ))
                          }
                        </div>
                      </>
                    }

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
                      upcomings && upcomings.length > 0 && (
                        <div className="grid-md">
                          <h2>Your Upcoming Payments</h2>
                          <Table 
                            isUpcoming={true}
                            transactions={
                              upcomings.sort((a, b) => a.createdAt - b.createdAt).sort((a, b) => a.transactionDate - b.transactionDate).slice(0, 8)
                            }
                          />
                          {upcomings.length > 8 && (
                            <Link to="upcoming-payments" className="btn btn--dark">
                              View all Upcoming Payments
                            </Link>
                          )}
                        </div>
                      )
                    }

                    {
                      filteredTransactions && filteredTransactions.length > 0 && (
                        <div className="grid-md">
                          <h2>Your Transactions</h2>
                          <Table 
                            isUpcoming={false}
                            transactions={
                              filteredTransactions.sort((a, b) => b.createdAt - a.createdAt).sort((a, b) => b.transactionDate - a.transactionDate).slice(0, 8)
                            }
                          />
                          {filteredTransactions.length > 8 && (
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
                    <p className="introText">Create a budget, savings, or asset plan to get started!</p>
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