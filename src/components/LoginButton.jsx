import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/LoginBtn.scss"

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="login-btn " onClick={() => loginWithRedirect()}>Welcome..</button>;
};

export default LoginButton;