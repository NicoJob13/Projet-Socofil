import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Auth = (props) => {
  const [signInModal, setSignInModal] = useState(props.signin);
  const [signUpModal, setSignUpModal] = useState(props.signup);

  const handleModals = (e) => {
    if (e.target.id === "signin") {
      setSignInModal(true);
      setSignUpModal(false);
    } else if (e.target.id === "signup") {
      setSignInModal(false);
      setSignUpModal(true);
    }
  };

  return (
    <div>
      <div className="authContainer">
        <div className="modalButtonContainer">
          <button
            id="signin"
            className={
              signInModal ? "btn btn-selector-active" : "btn btn-selector"
            }
            onClick={handleModals}
          >
            Se connecter
          </button>
          <button
            id="signup"
            className={
              signUpModal ? "btn btn-selector-active" : "btn btn-selector"
            }
            onClick={handleModals}
          >
            S'inscrire
          </button>
        </div>
        <div className="modalContainer">
          {signInModal && <SignInForm />}
          {signUpModal && <SignUpForm />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
