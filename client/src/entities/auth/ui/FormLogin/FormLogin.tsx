/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Field, SInput, SubmitButton } from "shared/ui";
import { useNotification } from "entities/notification";
import { useAuth } from "context";
import { IResponseUserData, ILoginFormInputs, useAsync } from "utils";

const formSchema = yup.object().shape({
  email: yup.string().required("You must specify an email"),
  password: yup.string().required("You must specify a password"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(formSchema),
  });
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
          {...register("email")}
        ></SInput>
      </Field>
      <Field label="Password" error={errors.password}>
        <SInput
          type="password"
          id="password"
          autoComplete="current-password"
          aria-invalid={errors.password ? "true" : "false"}
          {...register("password")}
        ></SInput>
      </Field>
      <SubmitButton isLoading={isLoading}>Login</SubmitButton>
    </form>
  );
};

export { LoginForm };
