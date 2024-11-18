import React, { useState, useEffect } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { InputSwitch } from 'primereact/inputswitch';
import "./widget.css";

interface WidgetProps {
  isToggledWiget: boolean;
  toggleWigetMenu: () => void;
  onToggleIconAside: (isChecked: boolean) => void;
  onToggleClockFooter: (isChecked: boolean) => void;
  onToggleDateFooter: (isChecked: boolean) => void;
}

const Widget: React.FC<WidgetProps> = ({ isToggledWiget, toggleWigetMenu, onToggleIconAside, onToggleClockFooter, onToggleDateFooter }) => {
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

  const handleIconAsideToggle = (e: any) => {
    const isChecked = e.value;
    setCheckIconAside(isChecked);
    onToggleIconAside(isChecked);

    if (isChecked) {
      localStorage.setItem('checkIconAside', JSON.stringify(isChecked));
    } else {
      localStorage.removeItem('checkIconAside');
    }
  };

  const handleClockFooterToggle = (e: any) => {
    const isChecked = e.value;
    setCheckClockFooter(isChecked);
    onToggleClockFooter(isChecked);

    if (isChecked) {
      localStorage.setItem('checkClockFooter', JSON.stringify(isChecked));
    } else {
      localStorage.removeItem('checkClockFooter');
    }
  };

  const handleDateFooterToggle = (e: any) => {
    const isChecked = e.value;
    setCheckDateFooter(isChecked);
    onToggleDateFooter(isChecked);

    if (isChecked) {
      localStorage.setItem('checkDateFooter', JSON.stringify(isChecked));
    } else {
      localStorage.removeItem('checkDateFooter');
    }
  };

  return (
    <div
      className={
        isToggledWiget
          ? "aside-widget-wrapper active-widget"
          : "aside-widget-wrapper"
      }
    >
      <div className="widget-header-area">
        <h2>Theme Widgets</h2>
        <button onClick={toggleWigetMenu}>
          <i className="pi pi-times" style={{ fontSize: '1.5rem' }}></i>
        </button>
      </div>
      <div className="widget-body-wrapper">
        <TabView>
          <TabPanel header="Theme Settings">
            <div className="set-features-list">
              <ul>
                <li>
                  <span className="set-label">Show icon on mobile menu</span>
                  <InputSwitch checked={checkIconAside} onChange={handleIconAsideToggle} />
                </li>
                <li>
                  <span className="set-label">Hide Digital Clock on Footer</span>
                  <InputSwitch checked={checkClockFooter} onChange={handleClockFooterToggle} />
                </li>
                <li>
                  <span className="set-label">Hide Date on Footer</span>
                  <InputSwitch checked={checkDateFooter} onChange={handleDateFooterToggle} />
                </li>
              </ul>
            </div>
          </TabPanel>
        </TabView>
      </div>
      <div className="widget-footer-panel">Footer</div>
    </div>
  );
};

export default Widget;
