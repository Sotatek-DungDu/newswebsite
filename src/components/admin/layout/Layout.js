import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import "../../../assets/css/maincontent.css";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const [activeKey, setActiveKey] = useState("");
  const location = useLocation();
  useEffect(() => {
    setActiveKey(location?.pathname);
  }, [location.pathname]);

  return (
    <div>
      <Sidebar activeKey={activeKey} />
      <div>
        <Topbar activeKey={activeKey} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
