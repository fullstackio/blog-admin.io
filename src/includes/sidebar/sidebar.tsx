import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import mainLogo from "./../../assets/images/Google_Gemini_logo200.png";
import checkIconLogo from "./../../assets/images/google-gemini-icon.webp";
import { classNames } from "primereact/utils";
import { CustomScroll } from "react-custom-scroll";
import './sidebar.css';

const Sidebar = ({ isToggled, toggleMenu, checkIconAside }: { isToggled: boolean, toggleMenu: () => void, checkIconAside: boolean }) => {

  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const menuName = location.pathname.split('/')[1];
    if (menuName) {
      setActiveMenu(menuName);
    } else {
      setActiveMenu(null);
    }
  }, [location.pathname]);

  const toggleSubMenu = (menuName: string) => {
    if (activeMenu === menuName) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuName);
    }
  };

  const handleMainMenuClick = (path: string) => {
    setActiveMenu(null);
  };

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <aside className={classNames("asidebar-wrapper", { "inactive-asidebar": isToggled, "show-icon": checkIconAside })}> {/* Add "show-icon" class */}
      <div className="asidebar-header">
        <div className="root_link">
          <Link to="/dashboard" className="checkLogo"><img src={checkIconLogo} alt="Main Logo" /></Link>
          <Link to="/dashboard" className="nonCheckLogo"><img src={mainLogo} alt="Main Logo" /></Link>
        </div>
      </div>
      <CustomScroll heightRelativeToParent="calc(100% - 20px)" className="scroller-outer-wrapper">
        <div className="asidebar-body">
     <ul className="sidebar-menu">
        <li className="menu-label"><span className="menu-lebel-check">Main</span></li> {/* Label for "Project" */}
        <li className={classNames({ "active-link": isActiveLink("/dashboard") })}>
          <Link to="/dashboard" onClick={() => handleMainMenuClick("/dashboard")}>
          <span className="menu-icon-box"><i className="pi pi-objects-column" ></i></span><span className="menu-item-name">Dashboard</span> </Link>
        </li>

        <li className="menu-label"><span className="menu-lebel-check">Pages</span></li> {/* Label for "Project" */}
        <li className={classNames("menu-item", { "active": activeMenu === "post" })}>
          <button className="dropdown-submenu" onClick={() => toggleSubMenu("post")}>
            <span className="menu-icon-box">
              <i className="pi pi-id-card" ></i>
            </span><span className="menu-item-name">Post</span> <span className="arrow-toggler"><i className="pi pi-chevron-right"></i></span></button>
          {activeMenu === "post" && (
            <ul className="submenu">
              <li className={classNames({ "active-link": isActiveLink("/post/all-posts") })}>
                <Link to="/post/all-posts"><span className="submenu-item-name">All Posts</span></Link>
              </li>
              <li className={classNames({ "active-link": isActiveLink("/post/add-post") })}>
                <Link to="/post/add-post"><span className="submenu-item-name">Add Post</span></Link>
              </li>
              <li className={classNames({ "active-link": isActiveLink("/post/draft") })}>
                <Link to="/post/draft"><span className="submenu-item-name">Draft</span></Link>
              </li>
            </ul>
          )}
        </li>
       

       
        
        <li className={classNames("menu-item", { "active": activeMenu === "user" })}>
          <button className="dropdown-submenu" onClick={() => toggleSubMenu("user")}>
          <span className="menu-icon-box"><i className="pi pi-users" ></i></span> <span className="menu-item-name">User</span> <span className="arrow-toggler"><i className="pi pi-chevron-right"></i></span></button>
          {activeMenu === "user" && (
            <ul className="submenu">
              <li className={classNames({ "active-link": isActiveLink("/user/all-users") })}>
                <Link to="/user/all-users"><span className="submenu-item-name">All Users</span></Link>
              </li>
              <li className={classNames({ "active-link": isActiveLink("/user/user-master") })}>
                <Link to="/user/user-master"><span className="submenu-item-name">User Master</span></Link>
              </li>
            </ul>
          )}
        </li>

        

        <li className="menu-label"><span className="menu-lebel-check">Utility</span></li> {/* Label for "Settings" */}
        <li className={classNames({ "active-link": isActiveLink("/settings") })}>
          <Link to="/settings" onClick={() => handleMainMenuClick("/settings")}><span className="menu-icon-box"><i className="pi pi-cog" ></i></span><span className="menu-item-name">Settings</span></Link>
        </li>
       
       
        <li className={classNames({ "active-link": isActiveLink("/signout") })}>
          <Link to="/signout" onClick={() => handleMainMenuClick("/signout")}><span className="menu-icon-box"><i className="pi pi-power-off" ></i></span><span className="menu-item-name">Signout</span></Link>
        </li>
       
      </ul>
      </div>
      </CustomScroll>
      <div className="asidebar-footer">
        <span className="version-control"> Version <span className="version-count">1.0.0</span> </span>
      </div>
    </aside>
  );
};

export default Sidebar;
