// helper imports
import React from "react";
import { Link, useFetcher } from "react-router-dom";
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from "../helpers"
import DeleteIcon from '@mui/icons-material/Delete';

const TransactionItem = ({ transaction }) => {
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
        ? <td style={{color: "#dd0426"}}>{symbol}{formatCurrency(transaction.amount)}</td>
        : <td style={{color: "#38b000"}}>{symbol}{formatCurrency(transaction.amount)}</td>
      }

      <td>{formatDateToLocaleString(transaction.transactionDate)}</td>

      <td>
        <Link
          to={`/plan/${plan.id}`}
          style={{
            "--accent": plan.color,
          }}
        >
          {plan.name}
        </Link>
      </td>

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