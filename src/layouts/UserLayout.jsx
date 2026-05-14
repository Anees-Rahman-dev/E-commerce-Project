// import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";

// export default function UserLayout() {
//   return (
//     <div className="min-h-screen bg-amber-50">
      
//       <Navbar />
//       <main className="max-w-7xl mx-auto px-4 py-6">
//         <Outlet />
//       </main>
//     </div>
//   );
// }


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