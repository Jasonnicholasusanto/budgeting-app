import React, { useState } from "react";
import { Form, Link } from "react-router-dom";

// helper functions
import { calculateMoney, formatCurrency, formatDateToLocaleString, formatPercentage, getDaysBetweenDates } from "../helpers";

// Icon imports
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import InfoIcon from '@mui/icons-material/Info';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

import EditPlanForm from "./EditPlanForm";

const BudgetItem = ({ budget, showDelete = false }) => {
    const { id, planType, name, amount, color, dateFrom, dateTo, createdAt, currency } = budget;

    const spent = calculateMoney(id);

    const today = new Date();

    const numDays = getDaysBetweenDates(today, dateTo) + 1;

    const [showEdit, setShowEdit] = useState(false);

    return (
        <div
            className="budget"
            style={{
                "--accent": color
            }}
        >
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount, currency)} Budgeted</p>
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
                            ? <small>{formatCurrency(spent, currency)} spent </small>
                            : <small>{formatCurrency(-spent, currency)} spent </small>
                        )   
                    : <small>{formatCurrency(spent, currency)} surplus </small>
                }

                <small>{formatCurrency(amount + spent, currency)} remaining</small>
                
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

            { (numDays !== null && showDelete) &&
                <small style={{marginTop: "2ch"}}>You have approximately {formatCurrency((amount+spent)/numDays, currency)} per day.</small>
            }

            { (numDays !== null && showDelete) &&
                <small style={{color: "#412110"}}>There are {numDays} days till {formatDateToLocaleString(dateTo)}.</small>
            }

            {showDelete ? (
                !showEdit && 
                    <div className="flex-sm">
                        <Form
                            method="post"
                            action="delete-plan"
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

                        <button type="submit" onClick={() => setShowEdit(!showEdit)} className="btn">
                            <span>Edit Budget</span>
                            <ModeEditIcon width={20} />
                        </button>
                    </div>
            ) : (
                <div className="flex-sm">
                    <Link to={`/budget/${id}`} className="btn">
                        <span>View Details</span>
                        <InfoIcon width={20} />
                    </Link>
                </div>
            )}

            {showEdit && 
                <div>
                    <EditPlanForm setShowEdit={setShowEdit} id={id} planType={planType} name={name} amount={amount} color={color} dateFrom={dateFrom} dateTo={dateTo} createdAt={createdAt}/>
                    
                    <button
                        className="btn btn--warning"
                        onClick={() => setShowEdit(false)}
                        style={{marginTop: "1ch"}}
                    >
                        <span>Cancel Edit</span>
                        <DoDisturbIcon width={20} />
                    </button>
                </div>
            }
        </div>
    )
}
export default BudgetItem;