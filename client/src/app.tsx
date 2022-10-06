/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

import React from "react";

function App() {
  return (
    <div
      css={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <h1
        css={{
          fontFamily: "Silkscreen, cursive"
        }}
      >
        Freelancer
      </h1>
      <div>
        <button>Login</button>
        <button>Register</button>
      </div>
    </div>
  );
}

export { App };
