// rrd imports
import { Form, Link, NavLink, useParams } from "react-router-dom"

// library
import DeleteIcon from '@mui/icons-material/Delete';

// assets
// import logomark from "../assets/logomark.svg"
import logo from "../assets/logo.svg";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CalculateIcon from '@mui/icons-material/Calculate';
import CoffeeIcon from '@mui/icons-material/Coffee';
import { useState } from "react";
import Calculator from "./Calculator/Calculator";

const Nav = ({ userName }) => {

  const [calculatorVisible, setCalculatorVisible] = useState(true);

  const toggleCalculator = () => {
    setCalculatorVisible(!calculatorVisible);
  
    const calculatorWrapper = document.querySelector(".calculatorWrapper");
    
    if (calculatorWrapper) {
      if (calculatorVisible) {
        calculatorWrapper.classList.add("visible"); // Show the calculator
        calculatorWrapper.classList.remove("hidden");
      } else {
        calculatorWrapper.classList.add("hidden"); // Hide the calculator
        calculatorWrapper.classList.remove("visible");
      }
    }
  };  

  return (
    <nav>
      <>
        <NavLink
          to="/"
          aria-label="Go to home"
        >
          <img src={logo} alt="" height={30} />
          <span>CashU</span>
        </NavLink>

        <Calculator className={calculatorVisible ? "calculatorWrapper visible" : "calculatorWrapper hidden"}/>

        <NavLink
          to=""
          aria-label="About us"
        >
          <EmojiPeopleIcon width={20}/>
          <span>About Us</span>
        </NavLink>

        <Link 
          to="https://bmc.link/jasonnicholas"
          target="_blank"
        >
          <CoffeeIcon width={20}/>
          <span>Donate</span>
        </Link>

        <button className="btn" onClick={toggleCalculator}>
          <CalculateIcon width={20}/>
          <span>Calculator</span>
        </button>
      </>

      {/* This section is for a button deleting user. */}
      {
        userName && (
          <Form
            method="post"
            action="/logout"
            onSubmit={(event) => {
              if (!confirm("Are you sure you want to delete user data? It will be gone forever!")) {
                event.preventDefault()
              }
            }}
          >
            <button type="submit" className="btn btn--warning">
              <span>Delete User</span>
              <DeleteIcon width={20} />
            </button>

          </Form>
        )
      }
    </nav>
  )
}
export default Nav;