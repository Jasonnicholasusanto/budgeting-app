import React, { useRef } from 'react';

import { Form, useFetcher } from "react-router-dom";

// library
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

// assets
import illustration from "../assets/illustration.jpg"

const Landing = () => {

    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const formRef = useRef();

    return (
        <div className="landing">
            <div>
                <h1>
                    {/* Say hello to <span className="accent">Financial Success</span> */}
                   {/* Take Charge of <span className="accent">Your Finances</span> */}
                   {/* Don't go nuts, plan with <span className="accent">CashU</span> */}
                   Spend your <span className="accent">CASHews</span> wisely.
                </h1>
                
                <p>
                    Feeling nutty about your finances? Let CashU help you crack the code to financial success!
                </p>

                <fetcher.Form 
                    method="post"
                    ref={formRef}
                >
                    <input
                        type="text"
                        name="userName"
                        required
                        placeholder="What is your name?" 
                        aria-label="Your Name" 
                        autoComplete="given-name"
                    />

                    <input 
                        type="hidden" 
                        name="_action" 
                        value="newUser" 
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

            {/* <img src={illustration} alt="Person with money" width={600} /> */}
        </div>
    )
}

export default Landing