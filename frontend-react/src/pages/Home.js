import React from "react";
import Auth from "../components/Auth";

const Home = () => {
  return (
    <div>
      <div>
        <Auth signin={true} signup={false} />
      </div>
    </div>
  );
};

export default Home;
