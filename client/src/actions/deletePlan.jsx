// rrd import
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { fetchData, deleteItem, getAllMatchingItems, updateAllMatchingItems } from "../helpers";

export function deletePlan({ params }) {
  const plan = (fetchData("plans")).filter(plan => plan.id === params.id)[0];

  try {

    // Deleting this plan
    deleteItem({
      key: "plans",
      id: params.id,
    });
    
    // // Fetching all the associated transactions to this plan
    const associatedTransactions = getAllMatchingItems({
      category: "transactions",
      key: "planId",
      value: params.id,
    });

    // Updating the associated transactions to set their planId to "none"
    const updatedTransactions = associatedTransactions.map(transaction => {
      return {
        ...transaction,
        planId: "none",
      };
    });

    updateAllMatchingItems({
      category: "transactions",
      key: "planId",
      value: params.id,
      updatedItems: updatedTransactions,
    });

    toast.success(`${plan.name} ${plan.planType} deleted successfully!`);
  } catch (e) {
    throw new Error("There was a problem deleting your plan.");
  }
  return redirect("/");
}