import * as yup from "yup";

const formSchema = yup.object().shape({
  date: yup.string().required("You must specify a date"),
  client: yup.string().required("You must specify a client"),
  projectNr: yup.string().required("You must specify a project number"),
  currency: yup.string(),
  payment: yup
    .number()
    .typeError("You must specify a number")
    .min(0, "You must specify a 0 or a positive number")
    .required("You must specify a sum"),
  comments: yup.string().max(200, "Can't be longer than 200 characters"),
});

export { formSchema };
