/** @jsxImportSource @emotion/react */
import React from "react";
import { Form, useFetcher } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Label,
  Input,
  Combobox,
  Select,
  Textarea,
  FormGroup,
  Button,
  Spinner,
  useModal,
  ErrorMessage,
} from "../shared/ui";
import { NotificationType, useNotification } from "../entities/notification";
import { IClient } from "../shared/types";

interface IProps {
  clients: IClient[];
}

interface IAddProjectForm {
  date: string;
  client: string;
  projectNr: string;
  currency: "USD" | "EUR";
  payment: number;
  comments: string;
}

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

const AddProjectForm: React.FC<IProps> = ({ clients }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddProjectForm>({
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
  const { setIsOpen } = useModal();
  const { showNotification } = useNotification();

  const isLoading = fetcher.state !== "idle";

  //** Show ERROR or SUCCESS message */
  React.useEffect(() => {
    if (fetcher.data && !isLoading) {
      const type =
        fetcher.data.status === "success"
          ? NotificationType.create
          : NotificationType.error;

      showNotification(type, fetcher.data.message);
    }

    if (fetcher?.data?.status === "success") {
      setIsOpen(false);
    }
  }, [fetcher.data, isLoading, setIsOpen, showNotification]);

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
      <FormGroup>
        <Label htmlFor="date">Date:</Label>
        <Input
          type="date"
          id="date"
          aria-invalid={errors.date ? "true" : "false"}
          {...register("date")}
        ></Input>
        {errors.date && (
          <ErrorMessage
            error={{ message: errors?.date.message }}
            variant="inline"
          />
        )}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="client">Client:</Label>
        <Combobox
          label="Choose a client"
          items={clients}
          {...register("client")}
        />
        {errors.client && (
          <ErrorMessage
            error={{ message: errors?.client.message }}
            variant="inline"
          />
        )}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="projectNr">Project Nr:</Label>
        <Input
          type="text"
          id="projectNr"
          aria-invalid={errors.projectNr ? "true" : "false"}
          {...register("projectNr")}
        ></Input>
        {errors.projectNr && (
          <ErrorMessage
            error={{ message: errors?.projectNr.message }}
            variant="inline"
          />
        )}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="currency">Currency:</Label>
        <Select id="currency" defaultValue={"USD"} {...register("currency")}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="payment">Payment:</Label>
        <Input
          type="text"
          inputMode="numeric"
          pattern="([0-9]*).([0-9]*)"
          step=".01"
          id="payment"
          aria-invalid={errors.projectNr ? "true" : "false"}
          {...register("payment")}
        ></Input>
        {errors.payment && (
          <ErrorMessage
            error={{ message: errors?.payment.message }}
            variant="inline"
          />
        )}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="comments">Comments:</Label>
        <Textarea
          css={{ maxWidth: "100%" }}
          aria-invalid={errors.comments ? "true" : "false"}
          {...register("comments")}
        ></Textarea>
        {errors.payment && (
          <ErrorMessage
            error={{ message: errors?.comments?.message }}
            variant="inline"
          />
        )}
      </FormGroup>
      <div css={{ marginTop: "30px" }}>
        <Button type="submit" disabled={isLoading}>
          Add {isLoading ? <Spinner css={{ marginLeft: 7 }} /> : null}
        </Button>
      </div>
    </Form>
  );
};

export { AddProjectForm };
