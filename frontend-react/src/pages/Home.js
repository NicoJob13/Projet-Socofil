import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Auth from "../components/Auth";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div>
      <div>
        {uid ? (
          <h2>Création de post</h2>
        ) : (
          <div>
            <Auth signin={true} signup={false} />
          </div>
        )}
      </div>
      <div>
        <h2>Fil d'actualité</h2>
      </div>
    </div>
  );
};

export default Home;
