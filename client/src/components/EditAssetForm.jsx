import React, { useEffect, useRef, useState } from "react";
import { Form, Link, useFetcher } from "react-router-dom";

// Icon imports
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import AccountTypes from "../planHelpers/AccountTypes.js";


const EditAssetForm = ({ setShowEdit, currency, id, assetType, name, balance, color, bankName, accountNumber,  bsbNumber, interestRate}) => {
    
    const [accountType, setAccountType] = useState(assetType);

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

    const resetting = () => {
        setShowEdit(false);
    }

    return (
        <div>
            <h2 className="h3" style={{marginBottom: "1.1ch", marginTop: "1.1ch"}}>Edit Asset</h2>
            
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

                <div className="form-flex">
                    <div className="grid-xs">
                        <label htmlFor="newAsset">New Asset Name*</label>
                        <input
                            type="text"
                            name="newAsset"
                            id="newAsset"
                            placeholder="e.g., Commbank Savings"
                            required
                            ref={focusRef}
                        />
                    </div>

                    <div className="grid-xs">
                        <label htmlFor="newBalance">New Balance*</label>
                        <input
                            type="number"
                            step="0.01"
                            name="newBalance"
                            id="newBalance"
                            placeholder="e.g., $15,000"
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
                            placeholder="e.g., Commonwealth"
                            required
                        />
                    </div>

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
                </div>

                <input
                    type="hidden"
                    name="_action"
                    value="editAsset"
                />

                <div className="flex-sm">
                    <button 
                        type="submit" 
                        className="btn"
                        disabled={isSubmitting}
                        onSubmit={() => resetting()}
                    >
                        {isSubmitting 
                            ? <span>Editing Asset...</span>
                            :   (<>
                                    <span>Edit Asset</span>
                                    <ModeEditIcon width={20} />
                                </>)
                        }
                    </button>
                </div>
            </formFetcher.Form>
        </div>
    )
}

export default EditAssetForm;