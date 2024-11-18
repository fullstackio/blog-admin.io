import React, { useState, useEffect } from 'react';
import { useLocation, Outlet, Link } from 'react-router-dom';
import Header from './../includes/header/header';
import Sidebar from './../includes/sidebar/sidebar';
import Footer from './../includes/footer/footer';
import usePageHeading from './../hooks/usePageHeading';
import './layout.css';
import Widget from '../includes/widgets/widget';

const Layout = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [isToggledWiget, setIsToggledWiget] = useState(false);
  const [checkIconAside, setCheckIconAside] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('checkIconAside');
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const [checkClockFooter, setCheckClockFooter] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('checkClockFooter');
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const [checkDateFooter, setCheckDateFooter] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('checkDateFooter');
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const [breadcrumbs, setBreadcrumbs] = useState<{ label: string, path: string }[]>([]);
  const location = useLocation();
  const heading = usePageHeading();

  const toggleMenu = () => {
    setIsToggled(!isToggled);
  };

  const toggleWigetMenu = () => {
    setIsToggledWiget(!isToggledWiget);
  };

  const handleIconAsideToggle = (isChecked: boolean) => {
    setCheckIconAside(isChecked);

    if (isChecked) {
      localStorage.setItem('checkIconAside', JSON.stringify(isChecked));
    } else {
      localStorage.removeItem('checkIconAside');
    }
  };

  const handleClockFooterToggle = (isChecked: boolean) => {
    setCheckClockFooter(isChecked);

    if (isChecked) {
      localStorage.setItem('checkClockFooter', JSON.stringify(isChecked));
    } else {
      localStorage.removeItem('checkClockFooter');
    }
  };

  const handleDateFooterToggle = (isChecked: boolean) => {
    setCheckDateFooter(isChecked);

    if (isChecked) {
      localStorage.setItem('checkDateFooter', JSON.stringify(isChecked));
    } else {
      localStorage.removeItem('checkDateFooter');
    }
  };

  const generateBreadcrumbs = (pathname: string) => {
    const pathnames = pathname.split('/').filter(x => x);
    return pathnames.map((_, index) => {
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      return { label: pathnames[index], path };
    });
  };

  useEffect(() => {
    setBreadcrumbs(generateBreadcrumbs(location.pathname));
  }, [location.pathname]);

  return (
    <div className="layout_wrapper">
      <Header isToggled={isToggled} toggleMenu={toggleMenu} toggleWigetMenu={toggleWigetMenu} checkIconAside={checkIconAside} />
      <Sidebar isToggled={isToggled} toggleMenu={toggleMenu} checkIconAside={checkIconAside} />
      <Widget 
        isToggledWiget={isToggledWiget} 
        toggleWigetMenu={toggleWigetMenu} 
        onToggleIconAside={handleIconAsideToggle}
        onToggleClockFooter={handleClockFooterToggle}
        onToggleDateFooter={handleDateFooterToggle}
      />
      <div className={isToggledWiget ? 'widget-overlay active-overlay' : 'widget-overlay'}></div>
      <main className={
        isToggled && checkIconAside
          ? "main_outlet_wrapper inactive_wrapper checked_aside_icon" 
          : isToggled
            ? "main_outlet_wrapper inactive_wrapper"
            : checkIconAside
              ? "main_outlet_wrapper checked_aside_icon"
              : "main_outlet_wrapper"
      }>
        <div className='breadcrumb-wrapper bradcrumb-bg-blue'>
          <div className='bradcrumb-heading-row'>
            <div className='page_left_heading'><h1>{heading || 'Default Heading'}</h1></div>
            <div className='bradcrumb_listing'>
              {breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={breadcrumb.path}>
                  {index > 0 && <span> <i className="pi pi-chevron-right" ></i> </span>}
                  <Link to={breadcrumb.path}>{breadcrumb.label}</Link>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className='outlet-wrapper-outer'>
          <Outlet />
        </div>
      </main>
      <Footer 
        isToggled={isToggled} 
        toggleMenu={toggleMenu} 
        checkIconAside={checkIconAside} 
        checkClockFooter={checkClockFooter}
        checkDateFooter={checkDateFooter}
      />
    </div>
  );
};

export default Layout;
