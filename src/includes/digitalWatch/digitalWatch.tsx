import React, { useState, useEffect } from 'react';

const DigitalWatch: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    // Function to update the current time
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };

    // Set up an interval to update the time every second
    const intervalId = setInterval(updateTime, 1000);

    // Listen for visibility changes to handle when the tab becomes visible again
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateTime();  // Update the time when the tab becomes visible again
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup the interval and event listener on component unmount
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="digital-watch">
      <p>{currentTime}</p>
    </div>
  );
};

export default DigitalWatch;
