/** @jsxImportSource @emotion/react */
import React from "react";
import { Form, useFetcher } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import type { IEditProjectForm } from 'entities/projects/types';
import { useFormNotifications, useModalForm } from 'entities/projects/hooks';
import { formSchema } from "entities/projects/schemas";
import {
  Field,
  SInput,
  Combobox,
  SSelect,
  STextarea,
  Button,
  Spinner,
} from "shared/ui";
import type { IClient, IProject } from "shared/types";

interface IProps {
  project: IProject;
  clients: IClient[];
}

const EditProjectForm: React.FC<IProps> = ({ project, clients }) => {
  const { register, handleSubmit, formState: {errors} } = useForm<IEditProjectForm>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      date: new Date(project.date).toISOString().split("T")[0],
      client: project.client.name,
      projectNr: project.projectNr,
      currency: project.currency,
      payment: project.payment,
      comments: project.comments,
      projectId: project._id,
    },
  });
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";

  useModalForm(fetcher.data);
  useFormNotifications(fetcher.data, isLoading);

  const formSubmit: SubmitHandler<IEditProjectForm> = (data) => {
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
    fetcher.submit(formData, {
      action: `projects/${data.projectId}/update`,
      method: "patch",
    });
  };

  return (
    <Form onSubmit={handleSubmit(formSubmit)}>
      <input type="hidden" {...register("projectId")} />
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
          label="Choose a client"
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
      <div css={{ marginTop: "30px" }}>
        <Button type="submit" disabled={isLoading}>
          Update {isLoading ? <Spinner css={{ marginLeft: 7 }} /> : null}
        </Button>
      </div>
    </Form>
  );
};

export { EditProjectForm };
