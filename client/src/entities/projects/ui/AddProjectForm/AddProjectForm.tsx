/** @jsxImportSource @emotion/react */
import { Form, useFetcher } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import type { IAddProjectForm } from '../../types';
import { useFormNotifications, useModalForm } from '../../hooks';
import {
  Field,
  Combobox,
  SSelect,
  STextarea,
  Button,
  Spinner,
  SInput
} from "shared/ui";
import type { IClient } from "shared/types";

const formSchema = yup.object().shape({
  date: yup.string().required("You must specify a date"),
  client: yup.string().required("You must specify a client"),
  projectNr: yup.string().required("You must specify a project number"),
  currency: yup.string(),
  payment: yup
    .number()
    .positive("You must specify a 0 or a positive number")
    .required("You must specify a sum"),
  comments: yup.string().max(200, "Can't be longer than 200 characters"),
});

interface IProps {
  clients: IClient[];
}

function AddProjectForm ({ clients }: IProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<IAddProjectForm>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      client: "",
      projectNr: "",
      currency: "USD",
      payment: 0,
      comments: "",
    },
  });
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";

  useModalForm(fetcher.data);
  useFormNotifications(fetcher.data, isLoading);

  const formSubmit: SubmitHandler<IAddProjectForm> = (data) => {
    let formData = new FormData();

    //** Check if there is a new client */
    const existingClient = clients.some(
      (client) => client.name === data.client,
    );
    if (!existingClient) {
      formData.append("newClient", `${data.client}`);
    }

    //** Append all fields */
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    fetcher.submit(formData, { action: "projects/add", method: "post" });
  };

  return (
    <Form onSubmit={handleSubmit(formSubmit)}>
      <Field label="Date" error={errors.date}>
        <SInput
          type="date"
          id="date"
          aria-invalid={errors.date ? "true" : "false"}
          {...register("date")}
        ></SInput>
      </Field>
      <Field label="Client" error={errors.client}>
        <Combobox
          id="client"
          label="Client"
          items={clients}
          {...register("client")}
        />
      </Field>
      <Field label="Project Nr" error={errors.projectNr}>
        <SInput
          type="text"
          id="projectNr"
          aria-invalid={errors.projectNr ? "true" : "false"}
          {...register("projectNr")}
        ></SInput>
        </Field>
      <Field label="Currency" error={errors.currency}>
        <SSelect id="currency" defaultValue={"USD"} {...register("currency")}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </SSelect>
      </Field>
      <Field label="Payment" error={errors.payment}>
        <SInput
          type="text"
          id="payment"
          inputMode="numeric"
          pattern="([0-9]*).([0-9]*)"
          step=".01"
          aria-invalid={errors.projectNr ? "true" : "false"}
          {...register("payment")}
        ></SInput>
      </Field>
      <Field label="Comments" error={errors.comments}>
        <STextarea
          id="comments"
          css={{ maxWidth: "100%" }}
          aria-invalid={errors.comments ? "true" : "false"}
          {...register("comments")}
        ></STextarea>
      </Field>
      <div css={{ marginTop: "30px" }}>
        <Button type="submit" disabled={isLoading}>
          Add {isLoading ? <Spinner css={{ marginLeft: 7 }} /> : null}
        </Button>
      </div>
    </Form>
  );
};

export { AddProjectForm };