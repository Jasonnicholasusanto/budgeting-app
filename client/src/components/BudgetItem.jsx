import React from "react";

// helper functions
import { calculateMoney, formatCurrency, formatDateToLocaleString, formatPercentage } from "../helpers";

// Icon imports
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { Form, Link } from "react-router-dom";

const BudgetItem = ({ budget, showDelete = false }) => {
    const { id, name, amount, color, dateFrom, dateTo, createdAt } = budget;
    const spent = calculateMoney(id);

    return (
        <div
            className="budget"
            style={{
                "--accent": color
            }}
        >
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount)} Budgeted</p>
            </div>

            <progress max={amount} value={amount + spent}>
                { spent <= 0
                    ? formatPercentage((amount + spent) / amount)
                    : formatPercentage(amount)
                }
            </progress>

            <div className="progress-text">
                { spent <= 0
                    ?   ( spent === 0 
                            ? <small>{formatCurrency(spent)} spent </small>
                            : <small>{formatCurrency(-spent)} spent </small>
                        )   
                    : <small>{formatCurrency(spent)} surplus </small>
                }

                <small>{formatCurrency(amount + spent)} remaining</small>
                
            </div>
            
            { (dateFrom !== null && dateTo !== null)
                ? <div className="progress-text">
                    <small style={{color: "#432211"}}>Budget from: {formatDateToLocaleString(dateFrom)}</small>
                    <small style={{color: "#432211"}}>Budget till: {formatDateToLocaleString(dateTo)}</small>
                </div>
                : <div className="progress-text">
                    <small style={{color: "#432211"}}>Created on: {formatDateToLocaleString(createdAt)}</small>
                </div>
            }

            {showDelete ? (
                <div className="flex-sm">
                    <Form
                        method="post"
                        action="delete"
                        onSubmit={(event) => {
                        if (
                            !confirm(
                            "Are you sure you want to permanently delete this budgeting plan?"
                            )
                        ) {
                            event.preventDefault();
                        }
                        }}
                    >
                        <button type="submit" className="btn">
                            <span>Delete Budget</span>
                            <DeleteIcon width={20} />
                        </button>
                    </Form>
                </div>
            ) : (
                <div className="flex-sm">
                    <Link to={`/budget/${id}`} className="btn">
                        <span>View Details</span>
                        <InfoIcon width={20} />
                    </Link>
                </div>
            )}
        </div>
    )
}
export default BudgetItem;