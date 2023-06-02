// rrd imports
import { useLoaderData } from "react-router-dom";

// library
import { toast } from "react-toastify";

// components
import AddTransactionForm from "../components/AddTransactionForm";
import Table from "../components/Table";
import AssetItem from "../components/AssetItem";

// helpers
import { createTransaction, deleteItem, editAsset, fetchData, getAllMatchingItems, getUpcomings, getTransactions } from "../helpers";

// loader
export async function assetLoader({ params }) {
  const asset = await getAllMatchingItems({
    category: "assets",
    key: "id",
    value: params.id,
  })[0];

  const transactions = await getAllMatchingItems({
    category: "transactions",
    key: "assetId",
    value: params.id,
  });

  const plans = fetchData("plans") ?? [];

  if (!asset) {
    throw new Error("The asset you’re trying to find doesn’t exist");
  }

  return { plans, asset, transactions };
}

// action
export async function assetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

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
  if (_action === "editAsset") {
    try {
      editAsset({
        id: values.id,
        name: values.newAsset,
        balance: values.newBalance,
        assetType: values.newAccountType,
        bankName: values.bankName,
        interestRate: values.interestRate,
        accountNumber: values.accountNumber,
        bsbNumber: values.bsbNumber
      })

      return toast.success(`Asset has been edited!`);

    } catch (e) {
      throw new Error("There was a problem editing your asset.");
    }
  }
}

const AssetPage = () => {
  const { plans, asset, transactions } = useLoaderData();

  const upcomings = getUpcomings(transactions);
  const filteredTransactions = getTransactions(transactions);

  return (
    <div
      className="grid-lg"
      style={{
        "--accent": asset.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{asset.name}</span> Bank Account Overview
      </h1>

      <div className="flex-lg">
        <AssetItem key={asset.id} asset={asset} showDelete={true} />
        
        <AddTransactionForm assetPage={true} assets={[asset]} plans={plans} currency={asset.currency}/>
      </div>

      {upcomings && upcomings.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{asset.name}</span> Upcoming Payments
          </h2>
          <Table 
            transactions={
              upcomings.sort((a, b) => a.createdAt - b.createdAt).sort((a, b) => a.transactionDate - b.transactionDate)
            } 
            showAsset={false} 
            showPlan={true} 
            isUpcoming={true}
          />
        </div>
      )}

      {filteredTransactions && filteredTransactions.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{asset.name}</span> Transactions
          </h2>
          <Table 
            transactions={
              filteredTransactions.sort((a, b) => b.createdAt - a.createdAt).sort((a, b) => b.transactionDate - a.transactionDate)
            } 
            showAsset={false} 
            showPlan={true} 
          />
        </div>
      )}

    </div>
  );
};
export default AssetPage;