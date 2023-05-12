// rrd imports
import { Form, Link, NavLink, useParams } from "react-router-dom"

// library
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CalculateIcon from '@mui/icons-material/Calculate';
import CookieIcon from '@mui/icons-material/Cookie';

// assets
import logo from "../assets/logo.svg";
import { useEffect, useState } from "react";
import Calculator from "./Calculator/Calculator";

const Nav = ({ userName }) => {

  const [calculatorVisible, setCalculatorVisible] = useState(false);

  const toggleCalculator = () => {
    setCalculatorVisible(!calculatorVisible);

    const calculatorWrapper = document.querySelector(".calculatorWrapper");
    
    if(calculatorWrapper){
      if (calculatorVisible) {
        // Hide the calculator
        calculatorWrapper.classList.remove("visible");
        calculatorWrapper.classList.add("hidden");
      } else {
        // Show the calculator
        calculatorWrapper.classList.remove("hidden"); 
        calculatorWrapper.classList.add("visible");
      }
    }
    
  };  

  /* Handling when user scroll to hide and display the Nav bar */
  let prevScrollpos = window.pageYOffset;

  window.addEventListener('scroll', function() {
    const currentScrollPos = window.pageYOffset;
    const navbar = document.querySelector('.navbar');

    if (prevScrollpos > currentScrollPos) {
      // Scrolling up
      navbar.classList.remove('navbar-hidden');
    } else {
      // Scrolling down
      navbar.classList.add('navbar-hidden');

      // When scrolling down, hide the calculator
      if(calculatorVisible){
        toggleCalculator();
      }
    }

    prevScrollpos = currentScrollPos;
  });

  return (
    <nav className="navbar">
      <>
        <NavLink
          to="/"
          aria-label="Go to home"
        >
          <img src={logo} alt="" height={30} />
          <span>CashU</span>
        </NavLink>

        <Calculator className={calculatorVisible ? "calculatorWrapper visible" : "calculatorWrapper"}/>

        <NavLink
          to="about-us"
          aria-label="About us"
        >
          <EmojiPeopleIcon width={20}/>
          <span>About Us</span>
        </NavLink>

        <Link 
          to="https://bmc.link/jasonnicholas"
          target="_blank"
        >
          <CookieIcon width={20}/>
          <span>Cookie</span>
        </Link>

        <button className={calculatorVisible ? "btn btn--dark" : "btn"} onClick={toggleCalculator}>
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