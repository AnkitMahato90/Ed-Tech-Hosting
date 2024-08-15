import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      {/* Menu icon to toggle sidebar on mobile */}
      <div className="lg:hidden absolute top-4 left-4 z-50">
        <HiMenu
          className="text-2xl cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Sidebar with full-screen overlay on mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:inset-0 lg:shadow-none`}
      >
        {/* HiMenu Icon placed inside Sidebar to close it */}
        <div className="p-4 lg:hidden flex justify-between items-center">
          <HiMenu
            className="text-2xl cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
        <Sidebar />
      </div>

      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main content area */}
      <div className="flex-1 h-[calc(100vh-3.5rem)] overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
