/** @jsxImportSource @emotion/react */
import { Form, useFetcher } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import type { IEditProjectForm } from "entities/projects/types/projects.types";
import {
  formSchema,
  useFormNotifications,
  useModalForm,
} from "entities/projects/lib";
import { formValsConstructor } from "entities/projects/lib";
import {
  Field,
  Combobox,
  SSelect,
  STextarea,
  SInput,
  SubmitButton,
} from "shared/ui";
import { Currency } from "shared/types";
import type { IClient, IProject } from "shared/types";

interface IProps {
  project?: IProject;
  clients: IClient[];
}

function AddEditProjectForm({ project, clients }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditProjectForm>({
    resolver: yupResolver(formSchema),
    defaultValues: formValsConstructor(project),
  });
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";

  useModalForm(fetcher.data);
  useFormNotifications(fetcher.data, isLoading);

  const formSubmit: SubmitHandler<IEditProjectForm> = (data) => {
    let formData = new FormData();

    //** Check if there is a new client */
    const existingClient = clients.some(
      (client) => client.name === data.client
    );
    if (!existingClient) {
      formData.append("newClient", `${data.client}`);
    }

    //** Append all fields */
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    fetcher.submit(formData, {
      action: project ? `projects/${data.projectId}/update` : "projects/add",
      method: project ? "patch" : "post",
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
        <SSelect
          id="currency"
          defaultValue={Currency.USD}
          {...register("currency")}
        >
          <option value={Currency.USD}>{Currency.USD}</option>
          <option value={Currency.EUR}>{Currency.EUR}</option>
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
      <SubmitButton isLoading={isLoading}>
        {project ? "Update" : "Add"}
      </SubmitButton>
    </Form>
  );
}

export { AddEditProjectForm };
