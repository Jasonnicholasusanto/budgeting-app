// rrd imports
import { redirect } from "react-router-dom";

// helpers
import { deleteItem } from "../helpers";
import { toast } from "react-toastify";

export async function logoutAction() {
  // delete the user
  deleteItem({
    key: "userName"
  })
  
  const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 1000));
  toast.promise(
      resolveAfter3Sec,
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