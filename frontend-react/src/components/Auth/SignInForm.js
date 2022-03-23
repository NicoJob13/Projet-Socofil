import axios from "axios";
import React, { useState } from "react";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/user/signin`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        emailError.textContent = "";
        passwordError.textContent = "";
        if (!res.data.error) {
          window.location = "/";
        } else {
          if (res.data.error.includes("User not found")) {
            emailError.textContent = "Utilisateur inconnu";
            console.log("Utilisateur inconnu");
          }
          if (res.data.error.includes("Incorrect password")) {
            passwordError.textContent = "Mot de passe incorrect";
            console.log("Mot de passe incorrect");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      className="formContainer"
      id="signInForm"
      action=""
      onSubmit={handleSignIn}
    >
      <div className="inputContainer">
        <label htmlFor="email">Email</label>
        <input
          className="formInput"
          id="email"
          type="email"
          name="email"
          title='Votre adresse email respectant le format "exemple@mail.com"'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div id="emailError" className="errorMessage"></div>
      <div className="inputContainer">
        <label htmlFor="password">Mot de passe</label>
        <input
          className="formInput"
          id="password"
          type="password"
          name="password"
          title="Minimum 8 caractères, 1 Majuscule, 1 minuscule, 1 chiffre, 1 symbole"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div id="passwordError" className="errorMessage"></div>
      <div className="inputContainer">
        <input
          className="btn btn-validation"
          type="submit"
          value="Se connecter"
        />
      </div>
    </form>
  );
};

export default SignInForm;
