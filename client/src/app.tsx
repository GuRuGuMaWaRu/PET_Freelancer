/** @jsxImportSource @emotion/react */
// import { jsx } from "@emotion/react";
import React from "react";
import { Dialog } from "@reach/dialog";
import { useForm, SubmitHandler } from "react-hook-form";

import * as colors from "./styles/colors";
import { ErrorMessage } from "./components/lib";

interface Inputs {
  email: string;
  password: string;
}

const LoginForm = ({
  onSubmit,
  submitButton,
}: {
  onSubmit: (data: any) => void;
  submitButton: React.ReactElement;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const submit: SubmitHandler<Inputs> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          {...(register("email"), { required: true })}
        ></input>
        <div>
          {errors.email ? (
            <ErrorMessage
              error={{ message: "This field is required" }}
              variant="inline"
            />
          ) : null}
        </div>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
        ></input>
        <div>
          {errors.password ? (
            <ErrorMessage
              error={{ message: "This field is required" }}
              variant="inline"
            />
          ) : null}
        </div>
      </div>
      {React.cloneElement(
        submitButton,
        { type: "submit" },
        ...(Array.isArray(submitButton.props.children)
          ? submitButton.props.children
          : [submitButton.props.children]),
      )}
    </form>
  );
};

function App() {
  const [loginDialog, setLoginDialog] = React.useState(false);

  const showLoginDialog = () => setLoginDialog(true);
  const hideLoginDialog = () => setLoginDialog(false);
  const handleLogin = (data: Inputs) => {
    console.log(data);
  };

  return (
    <div
      css={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.base,
      }}
    >
      <h1 css={{ color: "#fff", fontSize: "3em" }}>Freelancer</h1>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: "20px",
        }}
      >
        <button
          css={{
            color: colors.secondary,
            backgroundColor: colors.primary,
            border: 0,
            lineHeight: 1,
            fontSize: "1.1em",
            padding: "10px 15px",
          }}
          onClick={showLoginDialog}
        >
          Login
        </button>
        <button
          css={{
            color: colors.primary,
            backgroundColor: colors.secondary,
            border: 0,
            lineHeight: 1,
            fontSize: "1.1em",
            padding: "10px 15px",
          }}
        >
          Register
        </button>
      </div>
      <Dialog
        isOpen={loginDialog}
        onDismiss={hideLoginDialog}
        aria-label="Login Form"
      >
        <LoginForm
          onSubmit={handleLogin}
          submitButton={<button>Login</button>}
        />
        <button>Close</button>
      </Dialog>
    </div>
  );
}

export { App };
