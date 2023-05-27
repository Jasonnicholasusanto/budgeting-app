import React, { useEffect, useRef, useState } from 'react';
import { useFetcher } from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import PaymentsIcon from '@mui/icons-material/Payments';
import upcomingPaymentOpts from "../transactionHelpers/UpcomingPaymentOptions.js";
import transactionOptions from "../transactionHelpers/TransactionOptions.js";

const AddTransactionForm = ({ planPage = false, assetPage = false, plans, assets, currency }) => {

    // useFetcher() prefetches data for a route before it is rendered by React, allowing your application to load faster and provide a smoother user experience.
    const fetcher = useFetcher();

    // useRef() is a hook that provides a way to create a mutable reference that can persist across re-renders of a component.
    const formRef = useRef();
    const focusRef = useRef();

    const isSubmitting = fetcher.state === "submitting";

    const [transactionOpt, setTransactionOpt] = useState(transactionOptions[0].title);
    const [upcomingType, setUpcomingType] = useState(upcomingPaymentOpts[0].title);
    const [date, setDate] = useState(new Date());

    const todayDate = new Date();
    const tomorrowDate = new Date(todayDate);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset();
            focusRef.current.focus();
        }
    }, [isSubmitting])

    const setTransactionType = (e) => {
        const selectedValue = e.target.value;
        setTransactionOpt(selectedValue);
      
        if (selectedValue === "Upcoming") {
            setDate(tomorrowDate);
        } else {
            setDate(todayDate);
        }
    };
      

    return (
        <div className="form-wrapper">
            <h2 className="h3">
                Add New {" "}
                {plans &&
                    <span className="accent">
                        {(planPage) && `${plans.map((plan) => plan.name)}`}
                    </span>
                }

                {assets &&
                    <span className="accent">
                        {(assetPage) && `${assets.map((asset) => asset.name)}`}
                    </span>
                }
                {" "}Transaction
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
                            onChange={(e) => setTransactionType(e)}
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

                    {transactionOpt === "Upcoming" &&
                        <div className="grid-xs">
                            <label htmlFor="upcomingTransaction">
                                Upcoming Transaction Type
                            </label>
                            <select 
                                name="upcomingTransaction"
                                id="upcomingTransaction"
                                required
                                value={upcomingType}
                                onChange={(e) => setUpcomingType(e.target.value)}
                            >
                                {
                                    upcomingPaymentOpts
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
                    }
                </div>


                <div className="grid-xs">
                    { transactionOpt !== "Upcoming"
                        ? <label htmlFor="newTransaction">
                            {transactionOpt} Name*
                          </label>
                        : <label htmlFor="newTransaction">
                            {transactionOpt} Payment Name*
                          </label>
                    }
                    <input
                        type="text"
                        name="newTransaction"
                        id="newTransaction"
                        placeholder="e.g., Cashews"
                        ref={focusRef}
                        required
                    />
                </div>
                
                <div className="form-flex">
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

                    <div className="grid-xs">
                        <label htmlFor="transactionDate">
                            Transaction Date
                        </label>

                        <DatePicker 
                            // dateFormat="dd/MM/yyyy"
                            selected={date} 
                            onChange={(date) => setDate(date)} 
                            todayButton={transactionOpt !== "Upcoming" && "Today"}
                            name="transactionDate"
                            id="transactionDate"
                            excludeDateIntervals={transactionOpt === "Upcoming" 
                                && [{start: 0, end: todayDate.setDate(todayDate.getDate())}] 
                            }
                            maxDate={transactionOpt !== "Upcoming" && todayDate}
                        />
                    </div>
                </div>

                <div className="form-flex">
                    { (plans && plans.length > 0) &&
                        <div className="grid-xs" hidden={planPage}>
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

                                <option key={"none"} value={"none"}>
                                    None
                                </option>

                                {/* { (assets && assets.length > 0) &&
                                    <option key={"none"} value={"none"}>
                                        None
                                    </option>
                                } */}
                            </select>
                        </div>
                    }

                    { (assets && assets.length > 0) &&
                        <div className="grid-xs" hidden={assetPage}>
                            <label htmlFor="newTransactionAsset">
                                Asset Category
                            </label>
                            <select 
                                name="newTransactionAsset"
                                id="newTransactionAsset"
                                required
                            >

                                {
                                    assets
                                        .sort((a, b) => a.createdAt - b.createdAt)
                                        .map((asset) => {
                                            return (
                                                <option key={asset.id} value={asset.id}>
                                                    {asset.name}
                                                </option>
                                            )
                                        })
                                }

                                <option key={"none"} value={"none"}>
                                    None
                                </option>
                            </select>
                        </div>
                    }
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
                >
                    {
                        isSubmitting 
                            ? <span>Adding Transaction...</span>
                            :   (<>
                                    <span>Add Transaction</span>
                                    <PaymentsIcon width={20} />
                                </>)
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}

export default AddTransactionForm;