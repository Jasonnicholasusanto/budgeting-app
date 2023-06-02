// rrd imports
import React from "react";
import { useLoaderData } from "react-router-dom";

// component imports
import Table from "../components/Table";

// library import
import { toast } from "react-toastify";

// helpers
import { deleteItem, fetchData, getUpcomings } from "../helpers";

// upcoming payments loader
export function upcomingPaymentsLoader() {
  const transactions = fetchData("transactions");
  const upcomings = getUpcomings(transactions);

  return { upcomings };
}

// upcoming payments action
export async function upcomingPaymentsAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteTransaction") {
    try {
      deleteItem({
        key: "transactions",
        id: values.transactionId,
      });
      
      console.log("Checkpoint");
      return toast.success("Upcoming Payment deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting the upcoming payment.");
    }
  }
}

const UpcomingPaymentsPage = () => {
  const { upcomings } = useLoaderData();

  return (
    <div className="grid-lg" style={{minHeight: "40ch"}}>
      <h1>All Upcoming Payments</h1>
      {upcomings && upcomings.length > 0 ? (
        <div className="grid-md">
          <h2>
            Upcoming Payments <small>({upcomings.length} total)</small>
          </h2>
          <Table transactions={upcomings.sort((a, b) => a.createdAt - b.createdAt).sort((a, b) => a.transactionDate - b.transactionDate)} />
        </div>
      ) : (
        <p>No upcoming payments to show</p>
      )}
    </div>
  );
};

export default UpcomingPaymentsPage;