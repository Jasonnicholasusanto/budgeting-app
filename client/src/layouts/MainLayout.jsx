// react-router-dom imports
import { Outlet, useLoaderData } from "react-router-dom";

// assets
import wave from "../assets/wave.svg";
import trees from "../assets/trees.svg";
import sea from "../assets/sea-of-cashews.svg";

// <a href="https://www.freepik.com/free-psd/money-3d-illustration_29160308.htm#query=cash%20bill&position=6&from_view=keyword&track=ais">Image by Ekayasa.Design</a> on Freepik

// components
import Nav from "../components/Nav";

//  helper functions
import { fetchData } from "../helpers"

// loader
export function mainLoader() {
  const user = fetchData("users");
  return { user }
}

const MainLayout = () => {
  const { user } = useLoaderData();

  return (
    <div className="layout">
      {/* <img style={{position: "absolute", zIndex: "-1"}} src={wave} alt="" /> */}
      <Nav userName={user} />
      <main>
        <Outlet />
      </main>
      <img src={trees} alt= "" />
    </div>
  )
}
export default MainLayout;