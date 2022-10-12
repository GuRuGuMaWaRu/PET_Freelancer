/** @jsxImportSource @emotion/react */
// import { jsx } from "@emotion/react";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import * as colors from "./styles/colors";
import {
  Label,
  Input,
  Button,
  FormGroup,
  ErrorMessage,
} from "./components/lib";
import { Modal, ModalOpenButton, ModalContents } from "./components/modal";

interface ILoginFormInputs {
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
  } = useForm<ILoginFormInputs>();

  const submit: SubmitHandler<ILoginFormInputs> = (data) => {
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
          autoFocus
          {...register("email", { required: true })}
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
  const handleLogin = (data: ILoginFormInputs) => {
    console.log(data);
  };
  const handleRegister = (data: ILoginFormInputs) => {
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
        <Modal>
          <ModalOpenButton>
            <Button>Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login Form" title="Login">
            <LoginForm
              onSubmit={handleLogin}
              submitButton={<Button>Login</Button>}
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Register Form" title="Register">
            <LoginForm
              onSubmit={handleRegister}
              submitButton={<Button>Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  );
}

export { App };
