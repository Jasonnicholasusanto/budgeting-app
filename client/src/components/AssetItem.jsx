import React, { useState } from "react";
import { Form, Link } from "react-router-dom";

// helper functions
import { calculateBalance, formatCurrency, formatDateToLocaleString, formatPercentage } from "../helpers";

// Icon imports
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import InfoIcon from '@mui/icons-material/Info';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

import EditAssetForm from "./EditAssetForm";

const AssetItem = ({ asset, showDelete = false }) => {
    const { id, name, assetType, balance, bankName, createdOn, currency, accountNumber, bsbNumber, interestRate, color } = asset;
    const currentBalance = calculateBalance(balance, id);

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
                <p>Balance {formatCurrency(currentBalance, currency)}</p>
            </div>

            <div className="progress-text">
                <small>Bank name: {bankName}</small>
                <small>Interest Rate: {interestRate ? interestRate : "NIL"}%</small>
            </div>

            <div className="progress-text">
                <small style={{color: "#412110"}}>Asset Type: {assetType} account</small>
                <small style={{color: "#412110"}}>Created On: {createdOn}</small>
            </div>

            {showDelete ? (
                !showEdit && 
                <>
                    <div className="progress-text">
                        {accountNumber !== ""  
                            ? <small>Account Number: {accountNumber.replace(/\d/g, "*")}</small>
                            : <small>Account Number: (Not provided)</small>
                        }
                        {bsbNumber !== ""
                            ? <small>BSB Number: {bsbNumber.replace(/\d/g, "*")}</small>
                            : <small>BSB Number: (Not Provided)</small>
                        }
                    </div>

                    <div className="flex-sm">
                        <Form
                            method="post"
                            action="delete-asset"
                            onSubmit={(event) => {
                                if (
                                    !confirm(
                                        "Are you sure you want to permanently delete this asset plan?"
                                    )
                                ) {
                                    event.preventDefault();
                                }
                            }}
                        >
                            <button type="submit" className="btn">
                                <span>Delete Asset</span>
                                <DeleteIcon width={20} />
                            </button>
                        </Form>

                        <button type="submit" onClick={() => setShowEdit(!showEdit)} className="btn">
                            <span>Edit Asset</span>
                            <ModeEditIcon width={20} />
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex-sm">
                    <Link to={`/asset/${id}`} className="btn">
                        <span>View Details</span>
                        <InfoIcon width={20} />
                    </Link>
                </div>
            )}

            {showEdit && 
                <div>
                    <div className="progress-text">
                        {accountNumber !== ""  
                            ? <small>Account Number: {accountNumber}</small>
                            : <small>Account Number: (Not provided)</small>
                        }
                        {bsbNumber !== ""
                            ? <small>BSB Number: {bsbNumber}</small>
                            : <small>BSB Number: (Not Provided)</small>
                        }
                    </div>

                    <EditAssetForm setShowEdit={setShowEdit} currency={currency} id={id} assetType={assetType} name={name} balance={balance} color={color} accountNumber={accountNumber} bsbNumber={bsbNumber} interestRate={interestRate}/>
                    
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
export default AssetItem;