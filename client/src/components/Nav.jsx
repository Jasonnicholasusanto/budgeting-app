// rrd imports
import { Form, NavLink } from "react-router-dom"

// library
import DeleteIcon from '@mui/icons-material/Delete';

// assets
// import logomark from "../assets/logomark.svg"
import logo from "../assets/logo.svg";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CalculateIcon from '@mui/icons-material/Calculate';
import CoffeeIcon from '@mui/icons-material/Coffee';

const Nav = ({ userName }) => {
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

        {/* <NavLink
          to="/"
          aria-label="Calculator"
        >
          <CalculateIcon width={20}/>
          <span>Calculator</span>
        </NavLink>

        <NavLink
          to="/"
          aria-label="About us"
        >
          <EmojiPeopleIcon width={20}/>
          <span>About Us</span>
        </NavLink>

        <NavLink
          to="/"
          aria-label="Donate"
        >
          <CoffeeIcon width={20}/>
          <span>Donate</span>
        </NavLink> */}
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