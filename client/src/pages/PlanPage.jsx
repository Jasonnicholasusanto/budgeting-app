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
import { createTransaction, deleteItem, getAllMatchingItems } from "../helpers";

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

  if (!plan) {
    throw new Error("The plan you’re trying to find doesn’t exist");
  }

  return { plan, transactions };
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

const PlanPage = () => {
  const { plan, transactions } = useLoaderData();

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
        { plan.planType === "Budget" 
          ? <BudgetItem key={plan.id} budget={plan} showDelete={true} />
          : <SavingItem key={plan.id} saving={plan} showDelete={true} />
        }

        <AddTransactionForm plans={[plan]} />
      </div>

      {transactions && transactions.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{plan.name}'s</span> Transactions
          </h2>
          <Table transactions={transactions} showBudget={false} />
        </div>
      )}

    </div>
  );
};
export default PlanPage;