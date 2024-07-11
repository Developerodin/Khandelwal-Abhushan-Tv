import React from 'react';
import { IonHeader, IonToolbar } from '@ionic/react';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <IonHeader>
      
        <div className="header-logo">
          <div className="icon-background">
            <img src="assets/Frame 1.png" alt="Khandelwal Abhushan" className="logo-icon" />
          </div>
          <div className="header-text">
            <h2>Khandelwal Abhushan</h2>
            <p>M.G. Road, Near Shani Mandir, Akola, MH. - 444001</p>
          </div>
        </div>
    </IonHeader>
  );
};

export default Navbar;
