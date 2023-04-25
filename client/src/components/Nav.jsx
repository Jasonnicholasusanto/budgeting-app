// rrd imports
import { Form, NavLink } from "react-router-dom"

// library
// import { TrashIcon } from '@heroicons/react/24/solid'

import DeleteIcon from '@mui/icons-material/Delete';

// assets
import logomark from "../assets/logomark.svg"

const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink
        to="/"
        aria-label="Go to home"
      >
        <img src={logomark} alt="" height={30} />
        <span>CashewMoney</span>
      </NavLink>

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
              {/* <TrashIcon width={20} /> */}
              <DeleteIcon width={20} />
            </button>

          </Form>
        )
      }
    </nav>
  )
}
export default Nav;