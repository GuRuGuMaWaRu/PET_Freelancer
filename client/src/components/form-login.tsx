/** @jsxImportSource @emotion/react */
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Label, Input, FormGroup, ErrorMessage } from "./lib";
import { useAuth } from "../context/auth";

interface ILoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = ({ submitButton }: { submitButton: React.ReactElement }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>();
  const { login, status } = useAuth();
  const submit: SubmitHandler<ILoginFormInputs> = (data) => {
    login(data);
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

export { LoginForm };
