/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Label, Input, FormGroup, ErrorMessage, Spinner } from "./lib";
import { useAuth, useNotification } from "../context";
import { useAsync, NotificationType } from "../utils";

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
  const { setNotification } = useNotification();
  const { login } = useAuth();
  const submit: SubmitHandler<ILoginFormInputs> = (data) => {
    run(login(data)).catch((error) => console.error(error));
  };

  React.useEffect(() => {
    if (isError) {
      setNotification({
        type: NotificationType.error,
        message: error?.message ?? "There was an error",
      });
    }
  }, [error, isError, setNotification]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormGroup>
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          autoComplete="username"
          autoFocus
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email", {
            required: "You must specify an email address",
          })}
        ></Input>
        {errors.email && (
          <ErrorMessage
            error={{ message: errors?.email.message }}
            variant="inline"
          />
        )}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password:</Label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          aria-invalid={errors.password ? "true" : "false"}
          {...register("password", { required: "You must specify a password" })}
        ></Input>
        {errors.password && (
          <ErrorMessage
            error={{ message: errors?.password.message }}
            variant="inline"
          />
        )}
      </FormGroup>
      <div css={{ marginTop: "30px" }}>
        {React.cloneElement(
          submitButton,
          { type: "submit", disabled: isLoading ? true : false },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isLoading ? <Spinner css={{ marginLeft: 7 }} /> : null,
        )}
      </div>
    </form>
  );
};

export { LoginForm };
