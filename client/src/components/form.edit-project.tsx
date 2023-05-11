/** @jsxImportSource @emotion/react */
import React from "react";
import { Form, useFetcher } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Field,
  SInput,
  Combobox,
  SSelect,
  STextarea,
  Button,
  Spinner,
  useModal,
} from "shared/ui";
import type { IClient, IProject } from "shared/types";
import { useNotification } from "entities/notification";

interface IEditProjectForm {
  date: string;
  client: string;
  projectNr: string;
  currency: "USD" | "EUR" | "GBP";
  payment: number;
  comments: string;
  projectId: string;
}

const formSchema = yup.object().shape({
  date: yup.date().required("You must specify a date"),
  client: yup.string().required("You must specify a client"),
  projectNr: yup.string().required("You must specify a project number"),
  currency: yup.string(),
  payment: yup
    .number()
    .positive("You must specify a 0 or a positive number")
    .required("You must specify a sum"),
  comments: yup.string().max(200, "Can't be longer than 200 characters"),
  projectId: yup.string().required(),
});

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
  const { setIsOpen } = useModal();
  const notification = useNotification();

  const isLoading = fetcher.state !== "idle";

  //** Show SUCCESS or WARNING message */
  React.useEffect(() => {
    if (fetcher.data && !isLoading) {
      if (fetcher.data.status === "success") {
        notification.success(fetcher.data.message);
      } else {
        notification.warning(fetcher.data.message);
      }
    }
  }, [fetcher.data, isLoading, notification]);

  //** Close Modal on success */
  React.useEffect(() => {
    if (fetcher?.data?.status === "success") {
      setIsOpen(false);
    }
  }, [fetcher.data, setIsOpen]);

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
