import React from "react";

// helper functions
import { calculateMoney, formatCurrency, formatDateToLocaleString, formatPercentage } from "../helpers";

// Icon imports
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { Form, Link } from "react-router-dom";

const SavingItem = ({ saving, showDelete = false }) => {
    const { id, name, amount, color, dateFrom, dateTo, createdAt } = saving;
    const saved = calculateMoney(id);

    console.log(saved);

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

            <small>{formatCurrency(amount - saved)} remaining</small>
                
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

            {showDelete ? (
                <div className="flex-sm">
                    <Form
                        method="post"
                        action="delete"
                        onSubmit={(event) => {
                        if (
                            !confirm(
                            "Are you sure you want to permanently delete this saving plan?"
                            )
                        ) {
                            event.preventDefault();
                        }
                        }}
                    >
                        <button type="submit" className="btn">
                            <span>Delete Saving</span>
                            <DeleteIcon width={20} />
                        </button>
                    </Form>
                </div>
            ) : (
                <div className="flex-sm">
                    <Link to={`/saving/${id}`} className="btn">
                        <span>View Details</span>
                        <InfoIcon width={20} />
                    </Link>
                </div>
            )}
        </div>
    )
}
export default SavingItem;