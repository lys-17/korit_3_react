import React from "react";
import AuthContext from "./AuthContext";

export default function Mycomponent() {
  const authContext = React.useContext(AuthContext);

  return(
    <>
      <h1>안녕하세요, {authContext}님</h1>
    </>
  );
}