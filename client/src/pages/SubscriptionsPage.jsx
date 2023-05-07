// rrd imports
import React from "react";
import { useLoaderData } from "react-router-dom";

// component imports
import Table from "../components/Table";

// library import
import { toast } from "react-toastify";

// helpers
import { deleteItem, fetchData, getSubscriptions } from "../helpers";

// subscriptions loader
export function subscriptionsLoader() {
  const transactions = fetchData("transactions");
  const subscriptions = getSubscriptions(transactions);

  return { subscriptions };
}

// subscriptions action
export async function subscriptionsAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteTransaction") {
    try {
      deleteItem({
        key: "transactions",
        id: values.transactionId,
      });
      
      console.log("Checkpoint");
      return toast.success("Subscription deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting the subscription.");
    }
  }
}

const SubscriptionsPage = () => {
  const { subscriptions } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Subscriptions</h1>
      {subscriptions && subscriptions.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Subscriptions <small>({subscriptions.length} total)</small>
          </h2>
          <Table transactions={subscriptions.sort((a, b) => b.createdAt - a.createdAt).sort((a, b) => b.transactionDate - a.transactionDate)} />
        </div>
      ) : (
        <p>No subscriptions to show</p>
      )}
    </div>
  );
};

export default SubscriptionsPage;