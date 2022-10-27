/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Label, Input, FormGroup, ErrorMessage, Spinner } from "./lib";
import { useAuth, useNotification } from "../context";
import { useAsync, NotificationType } from "../utils";

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
  const { setNotification } = useNotification();
  const { signup } = useAuth();
  const submit: SubmitHandler<IRegisterFormInputs> = (data) => {
    run(signup(data)).catch((error) => console.error(error));
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
        <Label htmlFor="email">Name:</Label>
        <Input
          type="text"
          id="name"
          autoComplete="name"
          autoFocus
          aria-invalid={errors.name ? "true" : "false"}
          {...register("name", { required: "Name is required" })}
        ></Input>
        <div>
          {errors.name && (
            <ErrorMessage
              error={{ message: errors?.name.message }}
              variant="inline"
            />
          )}
        </div>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          autoComplete="username"
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email", { required: "Email is required" })}
        ></Input>
        <div>
          {errors.email && (
            <ErrorMessage
              error={{ message: errors?.email.message }}
              variant="inline"
            />
          )}
        </div>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password1">Password:</Label>
        <Input
          type="password"
          id="password1"
          autoComplete="current-password"
          aria-invalid={errors.password1 ? "true" : "false"}
          {...register("password1", { required: "Please provide a password" })}
        ></Input>
        <div>
          {errors.password1 && (
            <ErrorMessage
              error={{ message: errors?.password1.message }}
              variant="inline"
            />
          )}
        </div>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password1">Repeat password:</Label>
        <Input
          type="password"
          id="password2"
          autoComplete="current-password"
          aria-invalid={errors.password2 ? "true" : "false"}
          {...register("password2", {
            required: "Please repeat the password above",
          })}
        ></Input>
        <div>
          {errors.password2 && (
            <ErrorMessage
              error={{ message: errors?.password2.message }}
              variant="inline"
            />
          )}
        </div>
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

export { RegisterForm };
