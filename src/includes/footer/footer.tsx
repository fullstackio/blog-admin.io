import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { classNames } from "primereact/utils";
import DigitalWatch from './../digitalWatch/digitalWatch';

interface FooterProps {
  isToggled: boolean;
  toggleMenu: () => void;
  checkIconAside: boolean;
  checkClockFooter: boolean;
  checkDateFooter: boolean;
}

const Footer: React.FC<FooterProps> = ({ 
  isToggled, 
  toggleMenu, 
  checkIconAside,
  checkClockFooter,
  checkDateFooter 
}) => {

  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  // State to store the current date
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    // Function to format the date
    const formatDate = () => {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    };

    // Set the formatted date initially
    setCurrentDate(formatDate());

    // Set up an interval to check for date change every minute
    const interval = setInterval(() => {
      setCurrentDate(formatDate());
    }, 60000); // 60000 ms = 1 minute

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={classNames("footer-page-wrapper", { 
      "inactive-footer": isToggled, 
      "show-icon": checkIconAside 
    })}>
      <div className="footer_inner">
        <div className="footer_left">
          <div className="footer-menu">
            <ul>
              <li><Link to="#">Terms of Service</Link></li>
              <li><Link to="#">Privacy Policy</Link></li>
            </ul>
          </div>
          <p>© {currentYear} Google Gemini</p>
        </div>
        <div className="footer_right">
          {!checkClockFooter && (
            <div className="digital-watch">
              <DigitalWatch />
            </div>
          )}
          {!checkDateFooter && (
            <div className="current-date">{currentDate}</div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
