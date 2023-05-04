import React, { useState } from "react";
import { Form, Link } from "react-router-dom";

// helper functions
import { calculateMoney, formatCurrency, formatDateToLocaleString, formatPercentage } from "../helpers";

// Icon imports
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import InfoIcon from '@mui/icons-material/Info';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import EditPlanForm from "./EditPlanForm";

const SavingItem = ({ saving, showDelete = false }) => {
    const { id, planType, name, amount, color, dateFrom, dateTo, createdAt, currency } = saving;
    const saved = calculateMoney(id);

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
                <p>{formatCurrency(amount, currency)} Savings Goal</p>
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
                            ? <small>{formatCurrency(saved, currency)} deficit </small>
                            : <small>{formatCurrency(-saved, currency)} deficit </small>
                        )   
                    : <small>{formatCurrency(saved, currency)} saved </small>
                }

            <small>{formatCurrency(amount - saved, currency)} remaining</small>
                
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
                !showEdit && 
                    <div className="flex-sm">
                        <Form
                            method="post"
                            action="delete-plan"
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

                        <button type="submit" onClick={() => setShowEdit(!showEdit)} className="btn">
                            <span>Edit Saving</span>
                            <ModeEditIcon width={20} />
                        </button>
                    </div>
                ) : (
                    <div className="flex-sm">
                        <Link to={`/saving/${id}`} className="btn">
                            <span>View Details</span>
                            <InfoIcon width={20} />
                        </Link>
                    </div>
                )
            }

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
export default SavingItem;