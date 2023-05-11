import React, { useEffect, useRef, useState } from 'react';
import { Form, useFetcher } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

import businessMan from "../assets/new-business-man.png";
import cash from "../assets/3d-money-about-us.png";

import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { sendUserFeedback, waitPromise } from '../helpers';

export async function AboutUsAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    await waitPromise();

    if (_action === "feedback") {
        try {
            sendUserFeedback({
                email: values.email,
                name: values.name,
                subject: values.subject,
                message: values.message
            })
    
            return toast.success(`Feedback sent!`);
        } catch (e) {
            throw new Error("There was a problem sending your feedback message.")
        }
      }
}

const AboutUs = () => {

    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset();
            focusRef.current.focus();
        }
    }, [isSubmitting])

    return (
        <div className='about-us'>

            <div className="">
                <h1>About CashU</h1>
                <p>Welcome to CashU, a free-to-use financial planner created by Jason Nicholas Susanto, a recent graduate from the University of Melbourne. Inspired by Chris Pennington's CodingInPublic YouTube project, Jason created CashU with the aim of simplifying financial planning for individuals seeking an easy-to-use digital platform.</p>

                <h2>Primary Focus</h2>
                <p>With a focus on aesthetics and simplicity, CashU allows users to select their budgeting or savings goals and manually track their transactions. We understand the importance of user privacy, and all user data, including name, planners, and transactions, is securely stored in the user's local storage to prevent data leaks.</p>
            
                <h2>The Motivation</h2>
                <p>As the creator of CashU, Jason understands the importance of simplifying financial planning. Coming from a background of tracking expenses and budgeting with a physical journal, he wanted to create a tool that would make financial planning more accessible and less time-consuming. CashU allows users to effortlessly log transactions and calculate their spending within their allocated budget, making it easier for them to achieve their financial goals.</p>

                <h2>Talking about the future...</h2>
                <p>Looking towards the future, CashU plans to incorporate more functionalities, such as investment tracking for stocks and bonds and a money tracker for bank accounts, giving users a comprehensive financial planning experience. Our ultimate goal is to provide users with a one-stop shop for all their financial planning needs, equipping them with the necessary tools to confidently plan for their future. Thank you for choosing CashU, and we hope to support you on your financial journey.</p>
            
                <h1 style={{marginTop: "2ch"}}>Feedback Form</h1>
                <p>If you spot any bugs or have any suggestions for improvements, please feel free to send us a message!</p>

                <fetcher.Form 
                    method="post"
                    ref={formRef}
                >
                    <label htmlFor='email'>Email Address</label>
                    <input
                        type="text"
                        name="email"
                        required
                        placeholder="My email is..." 
                        aria-label="Your Email" 
                        autoComplete="email"
                        ref={focusRef}
                    />

                    <label htmlFor='name'>Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="My name is..." 
                        aria-label="Your Name" 
                        autoComplete="given-name"
                    />

                    <label htmlFor='subject'>Subject</label>
                    <input
                        type="text"
                        name="subject"
                        required
                        placeholder="What I want to tell you is..." 
                        aria-label="Your Subject" 
                    />

                    <label htmlFor='message'>Message</label>
                    <textarea
                        type="text"
                        name="message"
                        className='message'
                        required
                        placeholder="Hiii 👋🏻, I want to tell you..." 
                        aria-label="Your Message" 
                    />

                    <input 
                        type="hidden" 
                        name="_action" 
                        value="feedback" 
                        hidden
                    />

                    <button 
                        type="submit" 
                        className="btn btn--dark"
                        disabled={isSubmitting}
                        style={{marginTop: "1ch"}}
                    >
                        {
                            isSubmitting 
                                ? <span>Sending Feedback...</span>
                                :   (<>
                                        <span>Send Feedback</span>
                                        <ChatBubbleIcon width={20} />
                                    </>)
                        }
                    </button>
                </fetcher.Form>
            </div>

            <div>
                <img src={businessMan} style={{marginBottom: "20ch"}} alt="" className="floating" width={600}/>
                <img src={cash} alt="" className="floating-v2" width={500}/>
            </div>

        </div>
    )
}

export default AboutUs;