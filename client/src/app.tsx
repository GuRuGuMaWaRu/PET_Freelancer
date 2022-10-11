/** @jsxImportSource @emotion/react */
// import { jsx } from "@emotion/react";
import React from "react";
import { Dialog as ReachDialog } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "@emotion/styled";

import * as colors from "./styles/colors";
import * as mq from "./styles/media-queries";
import { ErrorMessage } from "./components/lib";

interface Inputs {
  email: string;
  password: string;
}

const Dialog = styled(ReachDialog)({
  maxWidth: "450px",
  borderRadius: "3px",
  margin: "20vh auto",
  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)",
  backgroundColor: colors.modalBg,
  color: colors.text,
  [mq.small]: {
    width: "100%",
    margin: "10vh auto",
  },
});

const FormGroup = styled.div({
  display: "flex",
  flexDirection: "column",
});

const inputStyles = {
  padding: "6px 10px",
  border: "1px solid #f1f1f4",
};

const Input = styled.input({ borderRadius: "3px" }, inputStyles);

const Label = styled.label({ margin: "10px 0 5px" });

const buttonVariants = {
  primary: {
    backgroundColor: colors.primary,
    color: colors.secondary,
  },
  secondary: {
    backgroundColor: colors.secondary,
    color: colors.primary,
  },
};

interface ButtonProps {
  variant?: string;
}

const Button = styled.button<ButtonProps>(
  {
    padding: "10px 15px",
    border: 0,
    borderRadius: "5px",
    lineHeight: 1,
    fontWeight: "bold",
  },
  ({ variant = "primary" }) =>
    buttonVariants[variant as keyof typeof buttonVariants],
);

const CircularButton = styled.button({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "40px",
  height: "40px",
  padding: 0,
  border: 0,
  borderRadius: "30px",
  fontSize: "2em",
  lineHeight: 1,
  color: colors.primary,
  backgroundColor: "transparent",
  cursor: "pointer",
});

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
      <FormGroup>
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          autoComplete="username"
          {...(register("email"), { required: true })}
        ></Input>
        <div>
          {errors.email ? (
            <ErrorMessage
              error={{ message: "This field is required" }}
              variant="inline"
            />
          ) : null}
        </div>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password:</Label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password", { required: true })}
        ></Input>
        <div>
          {errors.password ? (
            <ErrorMessage
              error={{ message: "This field is required" }}
              variant="inline"
            />
          ) : null}
        </div>
      </FormGroup>
      <div css={{ marginTop: "30px" }}>
        {React.cloneElement(
          submitButton,
          { type: "submit" },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
        )}
      </div>
    </form>
  );
};

function App() {
  const [loginDialog, setLoginDialog] = React.useState(false);
  const [registerDialog, setRegisterDialog] = React.useState(false);

  const showLoginDialog = () => setLoginDialog(true);
  const hideLoginDialog = () => setLoginDialog(false);
  const handleLogin = (data: Inputs) => {
    console.log(data);
  };
  const showRegisterDialog = () => setRegisterDialog(true);
  const hideRegisterDialog = () => setRegisterDialog(false);
  const handleRegister = (data: Inputs) => {
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
        <Button onClick={showLoginDialog}>Login</Button>
        <Button onClick={showRegisterDialog} variant="secondary">
          Register
        </Button>
      </div>
      <Dialog
        isOpen={loginDialog}
        onDismiss={hideLoginDialog}
        aria-label="Login Form"
      >
        <div
          css={{
            position: "relative",
            display: "flex",
            justifyContent: "end",
            top: "-10px",
          }}
        >
          <CircularButton onClick={hideLoginDialog}>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden="true">×</span>
          </CircularButton>
        </div>
        <h2 css={{ margin: 0, textAlign: "center", fontSize: "2em" }}>Login</h2>
        <LoginForm
          onSubmit={handleLogin}
          submitButton={<Button>Login</Button>}
        />
      </Dialog>
      <Dialog
        isOpen={registerDialog}
        onDismiss={hideRegisterDialog}
        aria-label="Register Form"
      >
        <div
          css={{
            position: "relative",
            display: "flex",
            justifyContent: "end",
            top: "-10px",
          }}
        >
          <CircularButton onClick={hideRegisterDialog}>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden="true">×</span>
          </CircularButton>
        </div>
        <h2 css={{ margin: 0, textAlign: "center", fontSize: "2em" }}>
          Register
        </h2>
        <LoginForm
          onSubmit={handleRegister}
          submitButton={<Button>Register</Button>}
        />
      </Dialog>
    </div>
  );
}

export { App };
