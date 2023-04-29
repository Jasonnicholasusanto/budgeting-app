// rrd import
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { fetchData, deleteItem, getAllMatchingItems } from "../helpers";

export function deletePlan({ params }) {
  const plan = (fetchData("plans")).filter(plan => plan.id === params.id)[0];

  try {

    // Deleting this plan
    deleteItem({
      key: "plans",
      id: params.id,
    });
    
    // Fetching all the associated transactions to this plan
    const associatedTransactions = getAllMatchingItems({
      category: "transactions",
      key: "planId",
      value: params.id,
    });

    // Deleting the associated transactions to this plan
    associatedTransactions.forEach((transaction) => {
      deleteItem({
        key: "transactions",
        id: transaction.id,
      });
    });

    toast.success(`${plan.name} ${plan.planType} deleted successfully!`);
  } catch (e) {
    throw new Error("There was a problem deleting your plan.");
  }
  return redirect("/");
}