/** @jsxImportSource @emotion/react */
import React from "react";
import { Form, useSubmit } from "react-router-dom";
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
  ErrorMessage,
  Button,
  Spinner,
} from "./lib";
import { useModal } from "./modal";
import { useNotification } from "../context";
import { IClient, NotificationType } from "../utils/types";

interface IProps {
  clients: IClient[];
}

interface IAddProjectForm {
  date: string;
  client: string;
  projectNr: string;
  currency: "usd" | "eur";
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
      currency: "usd",
      payment: 0,
      comments: "",
    },
  });
  const submit = useSubmit();
  const { setIsOpen } = useModal();
  const { setNotification } = useNotification();

  const formSubmit: SubmitHandler<IAddProjectForm> = (data) => {
    let formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    submit(formData, { action: "projects/add", method: "post" });
    setNotification({
      type: NotificationType.create,
      message: "Project added successfully",
    });
    setIsOpen(false);
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
        <Select id="currency" defaultValue={"usd"} {...register("currency")}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="payment">Payment:</Label>
        <Input
          type="number"
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
        <Button type="submit">Add</Button>
      </div>
    </Form>
  );
};

export { AddProjectForm };
