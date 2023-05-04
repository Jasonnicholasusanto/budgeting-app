// helper imports
import React, { useState } from "react";
import { Link, useFetcher } from "react-router-dom";
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from "../helpers"
import DeleteIcon from '@mui/icons-material/Delete';

const TransactionItem = ({ transaction, showPlan, showAsset }) => {
  const symbol = (transaction.transactionType === "Expense") ? "-" : "+";

  const fetcher = useFetcher();

  const plan = getAllMatchingItems({
    category: "plans",
    key: "id",
    value: transaction.planId,
  })[0];

  const asset = getAllMatchingItems({
    category: "assets",
    key: "id",
    value: transaction.assetId,
  })[0];

  console.log(transaction.assetId);

  return (
    <>
      <td>{transaction.name}</td>

      { transaction.transactionType === "Expense" && 
        <td style={{color: "#dd0426"}}>{symbol}{formatCurrency(transaction.amount, transaction.currency)}</td>
      }

      { transaction.transactionType === "Income" &&
        <td style={{color: "#38b000"}}>{symbol}{formatCurrency(transaction.amount, transaction.currency)}</td>
      }

      { transaction.transactionType === "Subscription" &&
        <td style={{color: "black"}}>{formatCurrency(transaction.amount, transaction.currency)}</td>
      }

      <td>{formatDateToLocaleString(transaction.transactionDate)}</td>
      
      {showPlan && (
        (transaction.planId !== "none") 
          ? (
            <td>
              <Link
                to={`/${plan.planType.toLowerCase()}/${plan.id}`}
                style={{
                  "--accent": plan.color,
                }}
              >
                {plan.name}
              </Link>
            </td>
          )
          : <td>
            Not allocated
          </td>
        )
      }

      {showAsset && (
        (transaction.assetId !== "none") 
          ? (
            <td>
              <Link
                to={`/asset/${asset.id}`}
                style={{
                  "--accent": asset.color,
                }}
              >
                {asset.name}
              </Link>
            </td>
          )
          : <td>
            Not allocated
          </td>
        )
      }

      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteTransaction" />
          <input type="hidden" name="transactionId" value={transaction.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${transaction.name} transaction`}
          >
            <DeleteIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  )
}
export default TransactionItem;