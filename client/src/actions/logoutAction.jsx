// rrd imports
import { redirect } from "react-router-dom";

// helpers
import { deleteItem, waitPromise } from "../helpers";
import { toast } from "react-toastify";

export async function logoutAction() {
  
  // deleting the user
  deleteItem({
    key: "users"
  })
  deleteItem({
    key: "plans"
  })
  deleteItem({
    key: "transactions"
  })
    
  toast.promise(
      waitPromise,
      {
        pending: 'Deleting account...',
        success: 'Account deleted.',
        error: 'Error deleting account'
      }
  )

  // return redirect
  return (
    redirect("/")
  );
}