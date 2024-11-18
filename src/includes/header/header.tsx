// Header.tsx

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import mainLogo from "./../../assets/images/Google_Gemini_logo_200white.png";
import scrolledMainLogo from "./../../assets/images/Google_Gemini_logo200.png";
import userProfileIcon from "./../../assets/images/user.png";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { Avatar } from "primereact/avatar";
import "./header.css";
import { classNames } from "primereact/utils";
import { Tooltip } from 'primereact/tooltip';
import { CustomScroll } from "react-custom-scroll";

const Header = ({ isToggled, toggleMenu, toggleWigetMenu, checkIconAside }: { isToggled: boolean, toggleMenu: () => void, toggleWigetMenu: () => void, checkIconAside: boolean }) => {
  const menuLeft = useRef(null);
  const menuRight = useRef(null);
  const toast = useRef(null);

  const items = [
    {
      label: "Profile",
      items: [
        {
          label: "Settings",
          icon: "pi pi-cog",
          shortcut: "⌘+O",
        },
        {
          label: "Messages",
          icon: "pi pi-inbox",
          badge: 2,
        },
        {
          label: "Notifications",
          icon: "pi pi-bell",
        },
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          shortcut: "⌘+Q",
        },
      ],
    },
    {
      separator: true,
    },
    {
      template: (
        item: any,
        options: {
          onClick: (
            arg0: React.MouseEvent<HTMLButtonElement, MouseEvent>
          ) => void;
          className: any;
        }
      ) => {
        return (
          <button
            onClick={(e) => options.onClick(e)}
            className={classNames(
              options.className,
              "w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround"
            )}
          >
            <div className="inner_main_header">
             
              <div className="right_nav_list">
                <div className="profile-log">
                  <div
                    className="profile_row under-dropdown"
                    
                  >
                    <div className="profile-pic">
                      <img src={userProfileIcon} alt="Test Logo"></img>
                    </div>
                    <div className="prifile_log_Details">
                      <div className="profile-type">Admin</div>
                      <div className="profile-name-auth">Avijit Ghosh</div>
                    </div>
                  </div>
                  
                </div>
                
              </div>
            </div>
          </button>
        );
      },
    },
  ];

  const Notifications = [
    {
      label: "Notifications",
      icon: "pi pi-envelope",
      items: []
    },
    {
      separator: true,
    },
    {
      template: (
        item: any,
        options: {
          onClick: (
            arg0: React.MouseEvent<HTMLButtonElement, MouseEvent>
          ) => void;
          className: any;
        }
      ) => {
        return (
          
            <div className="notify-outer-self-wrapper">
             <div className="notify-scroller-part">
              <CustomScroll heightRelativeToParent="calc(300px - 0px)" className="scroller-box-innerdrop">
                <div className="noti-loop">
                  <div className="noti-col">
                    <Link to="#" className="noti-box">
                      <div className="noti-box-head">
                       <span className="profile-img"><img src={userProfileIcon} alt="Test Logo"></img></span>
                      </div>
                      <div className="noti-box-content">
                        <div className="header">
                          <h1>Jean Bowman <span>invited you to new project.</span></h1> <span className="status unread-notify"></span>
                        </div>
                        <div className="notify-time">4 minutes ago</div>
                      </div>
                    </Link>
                  </div>
                  <div className="noti-col">
                    <Link to="#" className="noti-box">
                      <div className="noti-box-head">
                       <span className="profile-img"><img src={userProfileIcon} alt="Test Logo"></img></span>
                      </div>
                      <div className="noti-box-content">
                        <div className="header">
                          <h1>Jean Bowman <span>invited you to new project.</span></h1> <span className="status read-notify"></span>
                        </div>
                        <div className="notify-time">4 minutes ago</div>
                      </div>
                    </Link>
                  </div>
                  <div className="noti-col">
                    <Link to="#" className="noti-box">
                      <div className="noti-box-head">
                       <span className="profile-img"><img src={userProfileIcon} alt="Test Logo"></img></span>
                      </div>
                      <div className="noti-box-content">
                        <div className="header">
                          <h1>Jean Bowman <span>invited you to new project.</span></h1> <span className="status read-notify"></span>
                        </div>
                        <div className="notify-time">4 minutes ago</div>
                      </div>
                    </Link>
                  </div>
                  <div className="noti-col">
                    <Link to="#" className="noti-box">
                      <div className="noti-box-head">
                       <span className="profile-img"><img src={userProfileIcon} alt="Test Logo"></img></span>
                      </div>
                      <div className="noti-box-content">
                        <div className="header">
                          <h1>Jean Bowman <span>invited you to new project.</span></h1> <span className="status unread-notify"></span>
                        </div>
                        <div className="notify-time">4 minutes ago</div>
                      </div>
                    </Link>
                  </div>
                  <div className="noti-col">
                    <Link to="#" className="noti-box">
                      <div className="noti-box-head">
                       <span className="profile-img"><img src={userProfileIcon} alt="Test Logo"></img></span>
                      </div>
                      <div className="noti-box-content">
                        <div className="header">
                          <h1>Jean Bowman <span>invited you to new project.</span></h1> <span className="status unread-notify"></span>
                        </div>
                        <div className="notify-time">4 minutes ago</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </CustomScroll>
             </div>
             <div className="notify-footer">
              <Link to='#'>View All Activity</Link>
             </div>
            </div>
          
        );
      },
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".main_header");
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={classNames("main_header", { "inactive_header": isToggled, "show-icon": checkIconAside })}> {/* Use checkIconAside */}
      <div className="inner_main_header">
        <div className="left_nav_toggle">
          <div className="sidebar-logo-main">
            <img src={mainLogo} alt="Test Logo" className="nonscroll-logo"></img>
            <img src={scrolledMainLogo} alt="Test Logo" className="scroll-logo"></img>
          </div>
          <button className="bar-toggler" onClick={toggleMenu}>
            <i
              className="pi pi-align-justify"
              style={{ color: "slateblue" }}
            ></i>
          </button>
        </div>
        <div className="right_nav_list">
          <div className="notification-pop">
            <div className="notify-trigger">
              <span className="status-count">2</span>
            <button onClick={(event) => (menuLeft.current as any)?.toggle(event)}
              aria-controls="popup_menu_left_notification">
              <i className="pi pi-bell"></i>
            </button>
            </div>
            <Menu model={Notifications} popup ref={menuLeft} id="popup_menu_left_notification"  popupAlignment="right" className="notification-drop-wrapper"  />
          </div>
          <div className="profile-log">
            <div
              className="profile_row"
              onClick={(event) => (menuRight.current as any)?.toggle(event)}
              aria-controls="popup_menu_left"
              aria-haspopup
            >
              <div className="profile-pic">
                <img src={userProfileIcon} alt="Test Logo"></img>
              </div>
              <div className="prifile_log_Details ">
                <div className="profile-type">Admin</div>
                <div className="profile-name-auth menu-drop">avijit.ghosh@indusnet.co.in</div>
              </div>
            </div>
            <Menu model={items} popup ref={menuRight} id="popup_menu_left"  popupAlignment="right"  />
          </div>
          
          <Tooltip target=".toggler_settings" />
          <div className="widget-toggler">
            <button className={classNames("toggler_settings", { "inactive_widgetbtn": isToggled })} onClick={toggleWigetMenu}>
              <i className="pi pi-ellipsis-v"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
