import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";

const SidebarLayout = () => (
  <div className="flex flex-row items-start gap-6">
    <Sidebar />
    <Outlet />
  </div>
);

export default SidebarLayout;
