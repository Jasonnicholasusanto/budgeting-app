import React from "react";

// helper functions
import { calculateMoney, formatCurrency, formatDateToLocaleString, formatPercentage } from "../helpers";

const SavingItem = ({ saving }) => {
    const { id, name, amount, color, dateFrom, dateTo, createdAt } = saving;
    const saved = calculateMoney(id);

    return (
        <div
            className="budget"
            style={{
                "--accent": color
            }}
        >
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount)} Savings Goal</p>
            </div>

            <progress max={amount} value={saved}>
                { saved <= 0
                    ? formatPercentage((saved) / amount)
                    : formatPercentage(0 / amount)
                }
            </progress>

            <div className="progress-text">
                { saved <= 0
                    ?   ( saved === 0 
                            ? <small>{formatCurrency(saved)} deficit </small>
                            : <small>{formatCurrency(-saved)} deficit </small>
                        )   
                    : <small>{formatCurrency(saved)} saved </small>
                }

                <small>{formatCurrency(amount + saved)} remaining</small>
                
            </div>
            
            { (dateFrom !== null && dateTo !== null)
                ? <div className="progress-text">
                    <small style={{color: "#432211"}}>Saving from: {formatDateToLocaleString(dateFrom)}</small>
                    <small style={{color: "#432211"}}>Saving till: {formatDateToLocaleString(dateTo)}</small>
                </div>
                : <div className="progress-text">
                    <small style={{color: "#432211"}}>Created on: {formatDateToLocaleString(createdAt)}</small>
                </div>
            }
        </div>
    )
}
export default SavingItem;