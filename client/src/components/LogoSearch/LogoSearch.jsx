import React from "react";
import Logo from "../../img/logo.png";
import './LogoSearch.css'
import { UilSearch } from '@iconscout/react-unicons'
const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img className="resim" src={Logo} alt="" />
      <div className="Search">
          <input type="text" placeholder="#Keşfet"/>
          <div className="s-icon">
                <UilSearch/>
          </div>
      </div>
    </div>
  );
};

export default LogoSearch;
