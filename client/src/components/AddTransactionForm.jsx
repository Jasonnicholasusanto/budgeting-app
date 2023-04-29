import React, { useEffect, useRef, useState } from 'react';
import { useFetcher } from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import PaymentsIcon from '@mui/icons-material/Payments';
import recurringExpenseTimeFrames from "../transactionHelpers/Recurring.js";
import transactionOptions from "../transactionHelpers/TransactionOptions.js";

const AddTransactionForm = ({ plans }) => {

    // useFetcher() prefetches data for a route before it is rendered by React, allowing your application to load faster and provide a smoother user experience.
    const fetcher = useFetcher();

    // useRef() is a hook that provides a way to create a mutable reference that can persist across re-renders of a component.
    const formRef = useRef();
    const focusRef = useRef();

    const isSubmitting = fetcher.state === "submitting";

    const [transactionOpt, setTransactionOpt] = useState(transactionOptions[0].title);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset();
            focusRef.current.focus();
        }
    }, [isSubmitting])

    return (
        <div className="form-wrapper">
            <h2 className="h3">
                Add New {" "}
                <span className="accent">
                    {plans.length === 1 && `${plans.map((plan) => plan.name)}`}
                </span>
                {" "}Transaction
            </h2>

            <fetcher.Form 
                method="post"
                className="grid-sm"
                ref={formRef}
            >

                <div className="expense-inputs">
                    <div className="grid-xs">
                        <label htmlFor="transactionOption">
                            Transaction Type
                        </label>
                        <select 
                            name="transactionOption"
                            id="transactionOption"
                            required
                            value={transactionOpt}
                            onChange={(e) => setTransactionOpt(e.target.value)}
                        >
                            {
                                transactionOptions
                                    .map((transactionOption) => {
                                        return (
                                            <option key={transactionOption.id} value={transactionOption.title}>
                                                {transactionOption.title}
                                            </option>
                                        )
                                    })
                            }
                        </select>
                    </div>

                    <div className="grid-xs">
                        <label htmlFor="recurringTransaction">
                            Recurring {transactionOpt}
                        </label>
                        <select 
                            name="recurringTransaction"
                            id="recurringTransaction"
                            required
                            disabled
                        >
                            {
                                recurringExpenseTimeFrames
                                    .map((options) => {
                                        return (
                                            <option key={options.id} value={options.value}>
                                                {options.title}
                                            </option>
                                        )
                                    })
                            }
                        </select>
                    </div>
                </div>


                <div className="grid-xs">
                    <label htmlFor="newTransaction">
                        {transactionOpt} Name*
                    </label>
                    <input
                        type="text"
                        name="newTransaction"
                        id="newTransaction"
                        placeholder="e.g., Cashews"
                        ref={focusRef}
                        required
                    />
                </div>

                <div className="grid-xs">
                    <label htmlFor="newTransactionAmount">
                        Amount*
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        inputMode="decimal"
                        name="newTransactionAmount"
                        id="newTransactionAmount"
                        placeholder="e.g., $5.50"
                        required
                    />
                </div>
                
                
                <div className="plan-date">
                    <div className="grid-xs" hidden={plans.length === 1}>
                        <label htmlFor="newTransactionPlan">
                            Plan Category
                        </label>
                        <select 
                            name="newTransactionPlan"
                            id="newTransactionPlan"
                            required
                        >
                            {
                                plans
                                    .sort((a, b) => a.createdAt - b.createdAt)
                                    .map((plan) => {
                                        return (
                                            <option key={plan.id} value={plan.id}>
                                                {plan.name}
                                            </option>
                                        )
                                    })
                            }
                        </select>
                    </div>
                    
                    <div className="grid-xs">
                        <label htmlFor="transactionDate">
                            Transaction Date
                        </label>

                        <DatePicker 
                            // dateFormat="dd/MM/yyyy"
                            selected={date} 
                            onChange={(date) => setDate(date)} 
                            todayButton="Today"
                            name="transactionDate"
                            id="transactionDate"
                        />
                    </div>
                </div>

                <input 
                    type="hidden"
                    name="_action"
                    value="createTransaction"
                />

                <button 
                    type="submit" 
                    className="btn btn--dark"
                    disabled={isSubmitting}
                    // onSubmit={() => resetDates()}
                >
                    {
                        isSubmitting 
                            ? <span>Adding Expense...</span>
                            :   (<>
                                    <span>Add Expense</span>
                                    <PaymentsIcon width={20} />
                                </>)
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}

export default AddTransactionForm;