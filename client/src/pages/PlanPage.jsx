// rrd imports
import { useLoaderData } from "react-router-dom";

// library
import { toast } from "react-toastify";

// components
import AddTransactionForm from "../components/AddTransactionForm";
import BudgetItem from "../components/BudgetItem";
import SavingItem from "../components/SavingItem";
import Table from "../components/Table";

// helpers
import { createTransaction, deleteItem, editPlan, fetchData, getAllMatchingItems, getSubscriptions, getTransactions } from "../helpers";
import currencies from "../dashboardHelpers/Currencies";

// loader
export async function planLoader({ params }) {
  const plan = await getAllMatchingItems({
    category: "plans",
    key: "id",
    value: params.id,
  })[0];

  const transactions = await getAllMatchingItems({
    category: "transactions",
    key: "planId",
    value: params.id,
  });

  const assets = fetchData("assets") ?? [];

  if (!plan) {
    throw new Error("The plan you’re trying to find doesn’t exist");
  }

  return { plan, assets, transactions };
}

// action
export async function planAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createTransaction") {
    try {
      createTransaction({
        transactionType: values.transactionOption,
        recurring: values.recurringTransaction,
        name: values.newTransaction,
        amount: values.newTransactionAmount,
        assetId: values.newTransactionAsset ? values.newTransactionAsset : "none",
        planId: values.newTransactionPlan ? values.newTransactionPlan : "none",
        transactionDate: values.transactionDate,
        currency: values.currency
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

  // Editing a plan
  if (_action === "editPlan") {
    try {
      editPlan({
        id: values.id,
        name: values.newPlan,
        amount: values.newPlanAmount,
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
      })

      return toast.success(`Plan has been edited!`);

    } catch (e) {
      throw new Error("There was a problem editing your plan.");
    }
  }
}

const PlanPage = () => {
  const { plan, assets, transactions } = useLoaderData();

  const subscriptions = getSubscriptions(transactions);
  const filteredTransactions = getTransactions(transactions);

  return (
    <div
      className="grid-lg"
      style={{
        "--accent": plan.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{plan.name}</span> {plan.planType} Overview
      </h1>

      <div className="flex-lg">
        { plan.planType === "Budget" && <BudgetItem key={plan.id} budget={plan} showDelete={true} />}
        { plan.planType === "Saving" && <SavingItem key={plan.id} saving={plan} showDelete={true} />}
        
        <AddTransactionForm planPage={true} assets={assets} plans={[plan]} currency={plan.currency}/>
      </div>

      {subscriptions && subscriptions.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{plan.name}</span> Subscriptions
          </h2>
          <Table 
            transactions={
              subscriptions.sort((a, b) => b.createdAt - a.createdAt).sort((a, b) => b.transactionDate - a.transactionDate)
            } 
            showPlan={false} 
            showAsset={true} 
          />
        </div>
      )}

      {filteredTransactions && filteredTransactions.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{plan.name}</span> Transactions
          </h2>
          <Table 
            transactions={
              filteredTransactions.sort((a, b) => b.createdAt - a.createdAt).sort((a, b) => b.transactionDate - a.transactionDate)
            } 
            showPlan={false} 
            showAsset={true} 
          />
        </div>
      )}

    </div>
  );
};
export default PlanPage;