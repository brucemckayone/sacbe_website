import React from "react";

function LoginButton() {
  return (
    <button
      onClick={() =>
        window.open(
          "https://billing.stripe.com/p/login/test_dR629SgVlcYOdri000"
        )
      }
    >
      <p>Log In</p>
    </button>
  );
}

export default LoginButton;
