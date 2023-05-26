/** @jsxImportSource @emotion/react */
import { Form, useFetcher } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import type { IAddProjectForm } from 'entities/projects/types';
import { useFormNotifications, useModalForm } from 'entities/projects/hooks';
import { formSchema } from "entities/projects/schemas";
import {
  Field,
  Combobox,
  SSelect,
  STextarea,
  SInput,
  SubmitButton
} from "shared/ui";
import type { IClient } from "shared/types";

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
          type="number"
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
      <SubmitButton isLoading={isLoading}>Add</SubmitButton>
    </Form>
  );
};

export { AddProjectForm };
