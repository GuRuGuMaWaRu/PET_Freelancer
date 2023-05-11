/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Field, SInput, Spinner } from "shared/ui";
import { useNotification } from "entities/notification";
import { useAuth } from "context";
import { IResponseUserData, ILoginFormInputs, useAsync } from "utils";

const LoginForm = ({ submitButton }: { submitButton: React.ReactElement }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>();
  const { run, isLoading, isError, error } = useAsync<
    IResponseUserData,
    Error
  >();
  const notification = useNotification();
  const { login } = useAuth();
  const submit: SubmitHandler<ILoginFormInputs> = (data) => {
    run(login(data)).catch((error) => console.error(error));
  };

  React.useEffect(() => {
    if (isError) {
      const message = error?.message ?? "There was an error";

      notification.warning(message);
    }
  }, [error, isError, notification]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field label="Email" error={errors.email}>
        <SInput
          type="email"
          id="email"
          autoComplete="username"
          autoFocus
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email", {
            required: "You must specify an email address",
          })}
        ></SInput>
      </Field>
      <Field label="Password" error={errors.password}>
        <SInput
          type="password"
          id="password"
          autoComplete="current-password"
          aria-invalid={errors.password ? "true" : "false"}
          {...register("password", { required: "You must specify a password" })}
        ></SInput>
      </Field>
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
