// rrd imports
import React from "react";
import { useLoaderData } from "react-router-dom";

// component imports
import Table from "../components/Table";

// library import
import { toast } from "react-toastify";

// helpers
import { deleteItem, fetchData, getTransactions} from "../helpers";

// transactions loader
export function transactionsLoader() {
  const rawTransactions = fetchData("transactions");
  const transactions = getTransactions(rawTransactions);
  return { transactions };
}

// transactions action
export async function transactionsAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteTransaction") {
    try {

      deleteItem({
        key: "transactions",
        id: values.transactionId,
      });
      
      console.log("Checkpoint");
      return toast.success("Transaction deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting the transaction.");
    }
  }
}

const TransactionsPage = () => {
  const { transactions } = useLoaderData();

  return (
    <div className="grid-lg" style={{minHeight: "40ch"}}>
      <h1>All Transactions</h1>
      {transactions && transactions.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Transactions <small>({transactions.length} total)</small>
          </h2>
          <Table transactions={transactions.sort((a, b) => b.createdAt - a.createdAt).sort((a, b) => b.transactionDate - a.transactionDate)} />
        </div>
      ) : (
        <p>No transactions to show</p>
      )}
    </div>
  );
};

export default TransactionsPage;