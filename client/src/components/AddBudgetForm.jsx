import React, { useState } from "react";
import { Form } from "react-router-dom";

// library imports
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddBudgetForm = () => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [date, setDate] = useState(true);

    return (
        <div className="form-wrapper">
            <h2 className="h3">
                Create budget
            </h2>
            <Form
                method="post"
                className="grid-sm"
            >
                <div className="grid-xs">
                    <label htmlFor="newBudget">Budget Name*</label>
                    <input
                        type="text"
                        name="newBudget"
                        id="newBudget"
                        placeholder="e.g., Groceries"
                        required
                    />
                </div>

                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Amount*</label>
                    <input
                        type="number"
                        step="0.01"
                        name="newBudgetAmount"
                        id="newBudgetAmount"
                        placeholder="e.g., $350"
                        required
                        inputMode="decimal"
                    />
                </div>

                <div className="grid-xs">
                    <label htmlFor="Date">Date <span className="textReducedOpacity">&#40;not required&#41;</span></label>

                    {date && (
                        <div className="grid-xs">
                            <DatePicker 
                                selected={startDate} 
                                onChange={(date) => setStartDate(date)} 
                                placeholderText="From"
                                name="dateFrom"
                                id="dateFrom"
                            />
                        </div>
                    )}

                    {date && (
                        <div className="grid-xs">
                            <DatePicker 
                                selected={endDate} 
                                onChange={(date) => setEndDate(date)} 
                                placeholderText="To"
                                name="dateTo"
                                id="dateTo"
                            />
                        </div>
                    )}
                </div>

                <input
                    type="hidden"
                    name="_action" 
                    value="createBudget"
                />

                <button type="submit" className="btn btn--dark">
                    <span>Create budget</span>
                    <AttachMoneyIcon width={20} />
                </button>
            </Form>
        </div>
    )
}
export default AddBudgetForm