import React, { useRef, useState } from 'react';

import { Form, useFetcher } from "react-router-dom";

// library
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

// assets
import cash from "../assets/3d-money-bundle.png";

import currencies from "../dashboardHelpers/Currencies.js";

const Landing = () => {

    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const formRef = useRef();

    const [currencyChoice, setCurrencyChoice] = useState("USD");

    return (
        <div className="landing">
            <div>
                <h1>
                    Spend your <span className="accent">CASHews</span> wisely.
                </h1>
                
                <p>
                    Feeling nutty about your finances? Let CashU help you crack the code to financial success!
                </p>

                <fetcher.Form 
                    method="post"
                    ref={formRef}
                    style={{marginTop: "1ch"}}
                >
                    <label htmlFor='email'>What is your email?</label>
                    <input
                        type="text"
                        name="email"
                        required
                        placeholder="Email" 
                        aria-label="Your Email" 
                        autoComplete="email"
                        style={{width: "80%"}}
                    />

                    <label htmlFor='name'>What is your name?</label>
                    <input
                        type="text"
                        name="userName"
                        required
                        placeholder="Name" 
                        aria-label="Your Name" 
                        autoComplete="given-name"
                        style={{width: "80%"}}
                    />

                    <label htmlFor="currency">Currency Choice</label>
                    <select 
                        name="currency"
                        id="currency"
                        value={currencyChoice}
                        onChange={(e) => setCurrencyChoice(e.target.value)}
                        required          
                        style={{width: "80%"}}              
                    >
                        {
                            currencies
                                .map((currency) => {
                                    return (
                                        <option key={currency.id} value={currency.value}>
                                            {currency.title}
                                        </option>
                                    )
                                })
                        }
                    </select>

                    <input 
                        type="hidden" 
                        name="_action" 
                        value="newUser" 
                        hidden
                    />

                    <button 
                        type="submit" 
                        className="btn btn--dark"
                        disabled={isSubmitting}
                    >
                        {
                            isSubmitting 
                                ? <span>Creating Account...</span>
                                :   (<>
                                        <span>Create Account</span>
                                        <PersonAddAltIcon width={20} />
                                    </>)
                        }
                    </button>
                </fetcher.Form>
            </div>

            <img src={cash} alt="" className="floating" width={600} />
        </div>
    )
}

export default Landing