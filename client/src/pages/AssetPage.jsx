// rrd imports
import { useLoaderData } from "react-router-dom";

// library
import { toast } from "react-toastify";

// components
import AddTransactionForm from "../components/AddTransactionForm";
import Table from "../components/Table";

// helpers
import { createTransaction, deleteItem, editAsset, editPlan, fetchData, getAllMatchingItems, getSubscriptions, getTransactions } from "../helpers";
import currencies from "../dashboardHelpers/Currencies";
import AssetItem from "../components/AssetItem";

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

  const subscriptions = getSubscriptions(transactions);
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

      {subscriptions && subscriptions.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{asset.name}</span> Subscriptions
          </h2>
          <Table 
            transactions={
              subscriptions.sort((a, b) => b.createdAt - a.createdAt).sort((a, b) => b.transactionDate - a.transactionDate)
            } 
            showAsset={false} 
            showPlan={true} 
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