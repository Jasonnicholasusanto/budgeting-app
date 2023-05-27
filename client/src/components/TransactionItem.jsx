// helper imports
import React, { useState } from "react";
import { Link, useFetcher } from "react-router-dom";
import { editUpcomingPayment, formatCurrency, formatDateToLocaleString, getAllMatchingItems } from "../helpers"
import DeleteIcon from '@mui/icons-material/Delete';

const TransactionItem = ({ isUpcoming, transaction, showPlan, showAsset }) => {
  
  const symbol = (transaction && (transaction.transactionType === "Expense")) ? "-" : "+";
  const upcomingPaymentSymbol = (transaction && (transaction.transactionType === "Upcoming" && transaction.transactionUpcomingType === "Expense")) ? "-" : "+";
  const todayDate = new Date();
  const fetcher = useFetcher();

  const plan = getAllMatchingItems({
    category: "plans",
    key: "id",
    value: transaction && transaction.planId,
  })[0];

  const asset = getAllMatchingItems({
    category: "assets",
    key: "id",
    value: transaction && transaction.assetId,
  })[0];


  if(isUpcoming && (new Date(transaction.transactionDate) <= todayDate)){

    editUpcomingPayment({
      id: transaction.id,
      type: transaction.transactionUpcomingType
    });

  }

  return (
    <>
      <td>{transaction.name}</td>

      { transaction.transactionType === "Expense" && 
        <td style={{color: "#dd0426"}}>{symbol}{formatCurrency(transaction.amount, transaction.currency)}</td>
      }

      { transaction.transactionType === "Income" &&
        <td style={{color: "#38b000"}}>{symbol}{formatCurrency(transaction.amount, transaction.currency)}</td>
      }

      { (transaction.transactionType === "Upcoming") &&
        <td style={{color: "black"}}>{upcomingPaymentSymbol}{formatCurrency(transaction.amount, transaction.currency)}</td>
      }

      {/* Next Payment date */}
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