// rrd import
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { fetchData, deleteItem, getAllMatchingItems, updateAllMatchingItems } from "../helpers";

export function deleteAsset({ params }) {
  const asset = (fetchData("assets")).filter(asset => asset.id === params.id)[0];

  try {

    // Deleting this asset
    deleteItem({
      key: "assets",
      id: params.id,
    });
    
    // // Fetching all the associated transactions to this asset
    const associatedTransactions = getAllMatchingItems({
      category: "transactions",
      key: "assetId",
      value: params.id,
    });

    // Updating the associated transactions to set their assetId to "none"
    const updatedTransactions = associatedTransactions.map(transaction => {
      return {
        ...transaction,
        assetId: "none",
      };
    });

    updateAllMatchingItems({
      category: "transactions",
      key: "assetId",
      value: params.id,
      updatedItems: updatedTransactions,
    });

    toast.success(`${asset.name} Asset plan deleted successfully!`);
  } catch (e) {
    throw new Error("There was a problem deleting your asset plan.");
  }
  return redirect("/");
}