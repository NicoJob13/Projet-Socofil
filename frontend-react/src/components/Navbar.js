import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import { UserIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import SignOut from "./Auth/SignOut";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      <div className="navbarContainer">
        <NavLink to="/">
          <div className="logoContainer">
            <img
              className="siteLogo"
              src="./images/logo.png"
              alt="Logos des établissements de SO.CO.FI"
            />
            <div className="siteName">So.Co.Fi...l</div>
          </div>
        </NavLink>
        {uid && (
          <div className="linksContainer">
            <div>
              <NavLink to="/profile">
                <div className="welcomeContainer">
                  <UserIcon className="icon" />
                  <div>Bienvenue {userData.firstname}</div>
                </div>
              </NavLink>
            </div>
            <div>
              <SignOut />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
