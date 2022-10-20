/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Label, Input, FormGroup, ErrorMessage, Spinner } from "./lib";
import { useAuth } from "../context/auth";
import { useAsync } from "../utils/useAsync";

interface IRegisterFormInputs {
  name: string;
  email: string;
  password1: string;
  password2: string;
}

const RegisterForm = ({
  submitButton,
}: {
  submitButton: React.ReactElement;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormInputs>();
  const { run, isLoading, isError, error } = useAsync();
  const { signup } = useAuth();
  const submit: SubmitHandler<IRegisterFormInputs> = (data) => {
    run(signup(data));
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormGroup>
        <Label htmlFor="email">Name:</Label>
        <Input
          type="text"
          id="name"
          autoComplete="name"
          autoFocus
          {...register("name", { required: true })}
        ></Input>
        <div>
          {errors.name ? (
            <ErrorMessage
              error={{ message: "This field is required" }}
              variant="inline"
            />
          ) : null}
        </div>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          autoComplete="username"
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
        <Label htmlFor="password1">Password:</Label>
        <Input
          type="password"
          id="password1"
          autoComplete="current-password"
          {...register("password1", { required: true })}
        ></Input>
        <div>
          {errors.password1 ? (
            <ErrorMessage
              error={{ message: "This field is required" }}
              variant="inline"
            />
          ) : null}
        </div>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password1">Repeat password:</Label>
        <Input
          type="password"
          id="password2"
          autoComplete="current-password"
          {...register("password2", { required: true })}
        ></Input>
        <div>
          {errors.password2 ? (
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
          true ? <Spinner css={{ marginLeft: 7 }} /> : null,
        )}
      </div>
    </form>
  );
};

export { RegisterForm };
