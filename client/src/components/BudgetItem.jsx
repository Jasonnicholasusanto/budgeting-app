import React from "react";

// helper functions
import { calculateBudget, fetchData, formatCurrency, formatDateToLocaleString, formatPercentage } from "../helpers";

const BudgetItem = ({ budget }) => {
    const { id, name, amount, color, dateFrom, dateTo, createdAt } = budget;
    const spent = calculateBudget(id);

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

            <progress max={amount} value={-spent}>
                { spent <= 0
                    ? formatPercentage((-spent) / amount)
                    : formatPercentage(0 / amount)
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
        </div>
    )
}
export default BudgetItem;