// helper imports
import React from "react";
import { Link, useFetcher } from "react-router-dom";
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from "../helpers"
import DeleteIcon from '@mui/icons-material/Delete';

const TransactionItem = ({ transaction, showPlan }) => {
  const symbol = (transaction.transactionType === "Expense") ? "-" : "+";

  const fetcher = useFetcher();

  const plan = getAllMatchingItems({
    category: "plans",
    key: "id",
    value: transaction.planId,
  })[0];

  return (
    <>
      <td>{transaction.name}</td>

      { transaction.transactionType === "Expense"
        ? <td style={{color: "#dd0426"}}>{symbol}{formatCurrency(transaction.amount, transaction.currency)}</td>
        : <td style={{color: "#38b000"}}>{symbol}{formatCurrency(transaction.amount, transaction.currency)}</td>
      }

      <td>{formatDateToLocaleString(transaction.transactionDate)}</td>
      
      { showPlan && 
        (
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