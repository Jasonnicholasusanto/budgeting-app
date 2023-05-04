import React, { useEffect, useRef, useState } from "react";
import { Form, useFetcher } from "react-router-dom";

// library imports
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import PlanTypes from "../planHelpers/PlanTypes.js";
import AccountTypes from "../planHelpers/AccountTypes.js";
import AddAsset from "./AddAsset.jsx";

const AddPlanForm = ({ currency }) => {

    const [planType, setPlanType] = useState(PlanTypes[0].title);
    const [accountType, setAccountType] = useState(AccountTypes[0].title);

    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset();
            focusRef.current.focus();
            resetDates();
        }
    }, [isSubmitting])

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [date, setDate] = useState(true);

    const resetDates = () => {
        setStartDate(null);
        setEndDate(null);
    }

    return (
        <div className="form-wrapper">
            <h2 className="h3">
                Create a Plan
            </h2>

            <fetcher.Form
                method="post"
                className="grid-sm"
                ref={formRef}
            >
                <input
                    id="currency"
                    type="hidden"
                    name="currency" 
                    defaultValue={currency}
                />

                <div className="form-flex">
                    <div className="grid-xs">
                        <label htmlFor="newPlanType">Plan Type</label>
                        <select 
                            name="newPlanType"
                            id="newPlanType"
                            value={planType}
                            onChange={(e) => setPlanType(e.target.value)}
                            required                        
                        >
                            {
                                PlanTypes
                                    .map((planType) => {
                                        return (
                                            <option key={planType.id} value={planType.title}>
                                                {planType.title}
                                            </option>
                                        )
                                    })
                            }
                        </select>
                    </div>

                    { planType === "Asset" && 
                        <div className="grid-xs">
                            <label htmlFor="newAccountType">Account Type</label>
                            <select 
                                name="newAccountType"
                                id="newAccountType"
                                value={accountType}
                                onChange={(e) => setAccountType(e.target.value)}
                                required                        
                            >
                                {
                                    AccountTypes
                                        .map((accountType) => {
                                            return (
                                                <option key={accountType.id} value={accountType.title}>
                                                    {accountType.title}
                                                </option>
                                            )
                                        })
                                }
                            </select>
                        </div>
                    }
                </div>

                { (planType === "Budget" || planType === "Saving") &&
                    <>
                        <div className="grid-xs">
                            <label htmlFor="newPlan">{planType} Name*</label>
                            <input
                                type="text"
                                name="newPlan"
                                id="newPlan"
                                placeholder="e.g., Groceries"
                                required
                                ref={focusRef}
                            />
                        </div>

                        <div className="grid-xs">
                            { planType === "Budget" &&
                                <label htmlFor="newPlanAmount">Total Budget*</label>
                            }

                            { planType === "Saving" &&
                                <label htmlFor="newPlanAmount">Savings Goal*</label>
                            }

                            <input
                                type="number"
                                step="0.01"
                                name="newPlanAmount"
                                id="newPlanAmount"
                                placeholder="e.g., $500"
                                required
                                inputMode="decimal"
                            />
                        </div>
                        
                        { (planType === "Budget" || planType === "Saving") &&
                            <div className="grid-xs">
                                <label htmlFor="Date">Date <span className="textReducedOpacity">&#40;not required&#41;</span></label>

                                {date && (
                                    <div className="form-flex">
                                        <DatePicker 
                                            // dateFormat="dd/MM/yyyy"
                                            selected={startDate} 
                                            onChange={(date) => setStartDate(date)} 
                                            placeholderText="From"
                                            todayButton="Today"
                                            name="dateFrom"
                                            id="dateFrom"
                                        />

                                        <DatePicker 
                                            // dateFormat="dd/MM/yyyy"
                                            selected={endDate} 
                                            onChange={(date) => setEndDate(date)} 
                                            placeholderText="To"
                                            todayButton="Today"
                                            name="dateTo"
                                            id="dateTo"
                                        />
                                    </div>
                                )}

                            </div>
                        }
                    </>
                }

                { planType === "Asset" &&
                    <AddAsset currency={currency} focusRef={focusRef}/>
                }

                <input
                    type="hidden"
                    name="_action" 
                    value={planType === "Asset" ? "createAsset" : "createPlan"}
                />

                <button 
                    type="submit" 
                    className="btn btn--dark"
                    disabled={isSubmitting}
                    onSubmit={() => resetDates()}
                >
                    {
                        isSubmitting 
                            ? <span>Creating plan...</span>
                            :   (<>
                                    <span>Create plan</span>
                                    <AttachMoneyIcon width={20} />
                                </>)
                    }
                </button>
                
            </fetcher.Form>
        </div>
    )
}
export default AddPlanForm;