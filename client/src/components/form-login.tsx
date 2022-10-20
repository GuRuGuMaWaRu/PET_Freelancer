/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Label, Input, FormGroup, ErrorMessage } from "./lib";
import { useAuth } from "../context/auth";
import { useAsync } from "../utils/useAsync";

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
  const { run, isLoading, isError, error } = useAsync();
  const { login } = useAuth();
  const submit: SubmitHandler<ILoginFormInputs> = (data) => {
    run(login(data));
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
          { type: "submit", disabled: isLoading ? true : false },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
        )}
      </div>
    </form>
  );
};

export { LoginForm };
