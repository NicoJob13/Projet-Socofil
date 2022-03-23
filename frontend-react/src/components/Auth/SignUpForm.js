import axios from "axios";
import React, { useState } from "react";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [site, setSite] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById(
      "confirmPasswordError"
    );
    const acceptCGU = document.getElementById("acceptCGU");
    const acceptCGUError = document.getElementById("acceptCGUError");

    confirmPasswordError.textContent = "";
    acceptCGUError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

    if (password !== confirmPassword || !acceptCGU.checked) {
      if (password !== confirmPassword) {
        confirmPasswordError.textContent =
          "Les mots de passe ne correspondent pas";
      }
      if (!acceptCGU.checked) {
        acceptCGUError.textContent =
          "Veuillez accepter les conditions générales d'utilisation";
      }
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/user/signup`,
        withCredentials: true,
        data: {
          firstname,
          lastname,
          site,
          job,
          email,
          password,
        },
      })
        .then((res) => {
          if (!res.data.error) {
            setFormSubmit(true);
          } else {
            if (res.data.error.includes("Invalid email")) {
              emailError.textContent =
                "L'email ne correspond pas au format attendu";
              console.log("L'email ne correspond pas au format attendu");
            }
            if (res.data.error.includes("Invalid password")) {
              passwordError.textContent =
                "Le mot de passe ne correspond pas au format attendu";
              console.log(
                "Le mot de passe ne correspond pas au format attendu"
              );
            }
            if (res.data.error.includes("This email is already in use")) {
              emailError.textContent = "Cet email est déjà utilisé";
              console.log("Cet email est déjà utilisé");
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <>
        {formSubmit ? (
          <>
            <div className="successMessage">
              Inscription réussie, vous pouvez vous connecter
            </div>
            <SignInForm />
          </>
        ) : (
          <form
            className="formContainer"
            id="signUpForm"
            action=""
            onSubmit={handleSignUp}
          >
            <div className="inputContainer">
              <label htmlFor="firstname">Prénom</label>
              <input
                required
                className="formInput"
                id="firstname"
                type="text"
                name="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="lastname">Nom</label>
              <input
                required
                className="formInput"
                id="lastname"
                type="text"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="site">Site</label>
              <select
                required
                className="formInput"
                id="site"
                name="site"
                value={site}
                onChange={(e) => setSite(e.target.value)}
              >
                <option value="">Votre établissement</option>
                <option value="Les Amandines">Les Amandines</option>
                <option value="Les Feuillades">Les Feuillades</option>
                <option value="Saint-Victoire">Saint-Victoire</option>
                <option value="Sibourg">Sibourg</option>
                <option value="SOCOFI">SOCOFI</option>
              </select>
            </div>
            <div className="inputContainer">
              <label htmlFor="job">Poste</label>
              <select
                required
                className="formInput"
                id="job"
                name="job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              >
                <option value="">Votre fonction</option>
                <option value="Agent d'accueil">Agent d'accueil</option>
                <option value="Agent d'entretien">Agent d'entretien</option>
                <option value="Agent technique">Agent technique</option>
                <option value="Aide-soignante">Aide-soignante</option>
                <option value="Assistante RH">Assistante RH</option>
                <option value="Comptable">Comptable</option>
                <option value="Cuisinier/ère">Cuisinier/ère</option>
                <option value="Ergothérapeuthe">Ergothérapeuthe</option>
                <option value="Infirmière">Infirmière</option>
                <option value="Kinésithérapeuthe">Kinésithérapeuthe</option>
                <option value="Magasinier">Magasinier</option>
                <option value="Secrétaire médicale">Secrétaire médicale</option>
                <option value="Serveur/se">Serveur/se</option>
                <option value="Technicien">Technicien</option>
              </select>
            </div>
            <div className="inputContainer">
              <label htmlFor="email">Email</label>
              <input
                required
                className="formInput"
                id="email"
                type="text"
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
                required
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
              <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
              <input
                required
                className="formInput"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div id="confirmPasswordError" className="errorMessage"></div>
            <div className="checkboxContainer">
              <input
                id="acceptCGU"
                type="checkbox"
                name="acceptCGU"
                className="checkbox"
              />
              <label htmlFor="acceptCGU" className="acceptCGU">
                J'accepte les
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  {" "}
                  conditions générales d'utilisation{" "}
                </a>
                du site.
              </label>
            </div>
            <div id="acceptCGUError" className="errorMessage"></div>
            <div className="inputContainer">
              <input
                className="btn btn-validation"
                type="submit"
                value="S'inscrire"
              />
            </div>
          </form>
        )}
      </>
    </div>
  );
};

export default SignUpForm;
