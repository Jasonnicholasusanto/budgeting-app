import React, { useState } from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddAsset = ({ currency, focusRef }) => {

    const [date, setDate] = useState(new Date());

    return (
        <div className="grid-sm">
            

            <div className="form-flex">
                <div className="grid-xs">
                    <label htmlFor="newAsset">Asset Name*</label>
                    <input
                        type="text"
                        name="newAsset"
                        id="newAsset"
                        placeholder="e.g., ANZ Savings"
                        required
                        ref={focusRef}
                    />
                </div>

                <div className="grid-xs">
                    <label htmlFor="newBalance">Balance*</label>
                    <input
                        type="number"
                        step="0.01"
                        name="newBalance"
                        id="newBalance"
                        placeholder="e.g., $10,000"
                        required
                        inputMode="decimal"
                    />
                </div>
            </div>

            <div className="form-flex">
                <div className="grid-xs">
                    <label htmlFor="bankName">
                        Bank Name*
                    </label>
                    <input
                        type="text"
                        name="bankName"
                        id="bankName"
                        placeholder="e.g., ANZ Plus"
                        required
                    />
                </div>

                <div className="grid-xs">
                    <label htmlFor="createdOn">
                        Asset Created On
                    </label>

                    <DatePicker 
                        // dateFormat="dd/MM/yyyy"
                        selected={date} 
                        onChange={(date) => setDate(date)} 
                        todayButton="Today"
                        name="createdOn"
                        id="createdOn"
                    />
                </div>
            </div>

            <div className="form-flex">

                <div className="grid-xs">
                    <label htmlFor="accountNumber">
                        Account Number
                    </label>
                    <input
                        type="text"
                        name="accountNumber"
                        id="accountNumber"
                        placeholder="e.g., 12345678"
                        maxLength="16"
                        onChange={e => {
                            // let value = e.target.value;
                            // let length = value.length;
                            // let maskedValue = length > 1 ? "*".repeat(length - 1) + value.slice(length - 1) : value;
                            // e.target.value = maskedValue;
                        }}
                    />
                </div>
                
                {currency === "AUD" && 
                    <div className="grid-xs">
                        <label htmlFor="bsbNumber">
                            BSB Number
                        </label>
                        <input
                            type="text"
                            name="bsbNumber"
                            id="bsbNumber"
                            placeholder="e.g., 123456"
                            maxLength="6"
                            // onChange={e => {
                            //     let value = e.target.value;
                            //     let length = value.length;
                            //     let maskedValue = length > 1 ? "*".repeat(length - 1) + value.slice(length - 1) : value;
                            //     e.target.value = maskedValue;
                            // }}
                        />
                    </div>
                }

                {currency === "USD" && 
                    <div className="grid-xs">
                        <label htmlFor="bsbNumber">
                            Routing Number
                        </label>
                        <input
                            type="text"
                            name="bsbNumber"
                            id="bsbNumber"
                            placeholder="e.g., 123456789"
                            maxLength="9"
                            // onChange={e => {
                            //     let value = e.target.value;
                            //     let length = value.length;
                            //     let maskedValue = length > 1 ? "*".repeat(length - 1) + value.slice(length - 1) : value;
                            //     e.target.value = maskedValue;
                            // }}
                        />
                    </div>
                }

                <div className="grid-xs">
                    <label htmlFor="interestRate">
                        Interest Rate
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        name="interestRate"
                        id="interestRate"
                        placeholder="e.g., 2.5%"
                        inputMode="decimal"
                    />
                </div>
            </div>
        </div>
    )
}

export default AddAsset;