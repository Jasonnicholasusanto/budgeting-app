// react-router-dom imports
import { useLoaderData } from "react-router-dom";

//  helper functions
import { fetchData } from "../helpers";

// loader - fetches data using the helper function and returns it in an object { userName }.
export function dashboardLoader() {
    const userName = fetchData("userName");
    return { userName }
}
 
const Dashboard = () => {
    // Using the useLoaderData() hook from RRD
    const { userName } = useLoaderData();

    return (
        <div>
            <h1>{userName}'s Dashboard</h1>
        </div>
    )
}
export default Dashboard;