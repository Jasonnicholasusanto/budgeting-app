// helper imports
import React from "react";
import { Link, useFetcher } from "react-router-dom";
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from "../helpers"
import DeleteIcon from '@mui/icons-material/Delete';

const TransactionItem = ({ transaction }) => {
  const symbol = (transaction.transactionType === "Expense") ? "-" : "+";

  const fetcher = useFetcher();

  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: transaction.budgetId,
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
          to={`/budget/${budget.id}`}
          style={{
            "--accent": budget.color,
          }}
        >
          {budget.name}
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