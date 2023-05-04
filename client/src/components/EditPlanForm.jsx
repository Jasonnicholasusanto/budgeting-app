import React, { useEffect, useRef, useState } from "react";
import { Form, Link, useFetcher } from "react-router-dom";

// Icon imports
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

// Date dependencies imports
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import currencies from "../dashboardHelpers/Currencies";

const EditPlanForm = ({ setShowEdit, id, planType, name, amount, color, dateFrom, dateTo, createdAt }) => {

    const formFetcher = useFetcher();
    const isSubmitting = formFetcher.state === "submitting";
    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset();
            focusRef.current.focus();
        }
    }, [isSubmitting])

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const resetting = () => {
        setShowEdit(false);
        setStartDate(null);
        setEndDate(null);
    }

    return (
        <div>
            <h2 className="h3" style={{marginBottom: "1.1ch", marginTop: "1.1ch"}}>Edit {planType}</h2>
            
            <formFetcher.Form 
                method="post"
                className="grid-sm"
                ref={formRef}
            >
                <input 
                    type="hidden"
                    name="id"
                    id="id"
                    defaultValue={id}
                    hidden
                />

                <div className="grid-xs">
                    <label htmlFor="newPlan">New {planType} Name*</label>
                    <input
                        type="text"
                        name="newPlan"
                        id="newPlan"
                        placeholder="e.g., Groceries"
                        ref={focusRef}
                        required
                    />
                </div>

                <div className="grid-xs">
                    { planType === "Budget" 
                        ? <label htmlFor="newPlanAmount">New Budget*</label>
                        : <label htmlFor="newPlanAmount">New Savings Goal*</label>
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

                {/* <div className="grid-xs">
                    <label htmlFor="currency">Currency Choice</label>
                    <select 
                        name="currency"
                        id="currency"
                        value={currencyChoice}
                        onChange={(e) => setCurrencyChoice(e.target.value)}
                        required                        
                    >
                        {
                            currencies
                                .map((currency) => {
                                    return (
                                        <option 
                                            key={currency.id} 
                                            value={currency.value}
                                            defaultValue={currency.value === currencyChoice ? true : false}
                                        >
                                            {currency.title}
                                        </option>
                                    )
                                })
                        }
                    </select>
                </div> */}

                <div className="grid-xs">
                    <label htmlFor="Date">New Dates <span className="textReducedOpacity">&#40;not required&#41;</span></label>

                    <div className="form-flex">
                        <DatePicker 
                            selected={startDate} 
                            onChange={(date) => setStartDate(date)} 
                            placeholderText="From"
                            todayButton="Today"
                            name="dateFrom"
                            id="dateFrom"
                        />

                        <DatePicker 
                            selected={endDate} 
                            onChange={(date) => setEndDate(date)} 
                            placeholderText="To"
                            todayButton="Today"
                            name="dateTo"
                            id="dateTo"
                        />
                    </div>
                </div>

                <input
                    type="hidden"
                    name="_action" 
                    value="editPlan"
                />

                <div className="flex-sm">

                    <button 
                        type="submit" 
                        className="btn"
                        disabled={isSubmitting}
                        onSubmit={() => resetting()}
                    >
                        {isSubmitting 
                            ? <span>Editing {planType}...</span>
                            :   (<>
                                    <span>Edit {planType}</span>
                                    <ModeEditIcon width={20} />
                                </>)
                        }
                    </button>
                </div>
            </formFetcher.Form>
        </div>
    )
}

export default EditPlanForm;