import React, { useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function ClockNavbarItem(props) {
  // Prevent rendering a duplicate clock inside the mobile sidebar menu
  if (props.mobile) {
    return null;
  }

  return (
    <BrowserOnly fallback={<div className={`navbar__item ${props.className || ''}`} style={{ display: 'flex', alignItems: 'center' }}><span id="localTime">--:--:--</span></div>}>
      {() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          const timerId = setInterval(() => {
            const el = document.getElementById('localTime');
            if (el) {
              el.textContent = new Date().toLocaleTimeString();
            }
          }, 1000);
          return () => clearInterval(timerId);
        }, []);

        return (
          <div {...props} className={`navbar__item ${props.className || ''}`} style={{ display: 'flex', alignItems: 'center' }}>
            <span id="localTime">{new Date().toLocaleTimeString()}</span>
            {/* Inject an inline style to guarantee it forces visibility on mobile over Docusaurus' default hiding */}
            <style dangerouslySetInnerHTML={{__html: `
              @media (max-width: 996px) {
                .clock-navbar-item {
                  display: flex !important;
                }
              }
            `}} />
          </div>
        );
      }}
    </BrowserOnly>
  );
}
