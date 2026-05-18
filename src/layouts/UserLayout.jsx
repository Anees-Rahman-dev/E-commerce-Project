

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function UserLayout() {
  return (
    <div className="min-h-screen bg-[#FDF6EC]">
      <Navbar />
      <Outlet />
    </div>
  );
}