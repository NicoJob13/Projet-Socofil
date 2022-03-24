import axios from "axios";
import cookie from "js-cookie";
import React from "react";
import { LogoutIcon } from "@heroicons/react/outline";

const SignOut = () => {
  const deleteCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const signOut = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/signout`,
      withCredentials: true,
    })
      .then(() => deleteCookie("jwt"))
      .catch((err) => {
        console.log(err);
      });

    window.location = "/";
  };

  return (
    <div>
      <LogoutIcon className="icon" onClick={signOut} />
    </div>
  );
};

export default SignOut;
