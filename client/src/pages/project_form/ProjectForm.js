import React from "react";
import axios from "axios";
import moment from "moment";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const formSchema = Yup.object().shape({
  date: Yup.date().required("Required"),
  client: Yup.string().required("Required"),
  newClient: Yup.string(),
  projectNr: Yup.string().required("Required"),
  currency: Yup.string().required("Required"),
  payment: Yup.number().required("Required")
});

export default function ProjectForm() {
  const [clients, setClients] = React.useState(null);

  React.useEffect(() => {
    const getClients = async () => {
      const { data: clients } = await axios.get("/clients");
      setClients(clients);
    };

    getClients();
  }, []);

  return (
    clients && (
      <Formik
        initialValues={{
          date: moment().format("YYYY-MM-DD"),
          client: clients[0],
          newClient: "",
          projectNr: "",
          currency: "USD",
          payment: 0
        }}
        validationSchema={formSchema}
        onSubmit={async (values, actions) => {
          try {
            console.log(values);
            await axios.post("/projects", values);
            actions.setSubmitting(false);
          } catch (err) {
            actions.setSubmitting(false);
            actions.setStatus({ msg: "Something went wrong" });
          }
        }}
        render={({ errors, status, touched, isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="date">Date:</label>
              <Field type="date" name="date" />
              <ErrorMessage name="date" component="div" />
            </div>
            <div>
              <label htmlFor="client">Client:</label>
              <Field name="client" component="select">
                {clients &&
                  clients.map((client, i) => (
                    <option key={client._id} value={client._id}>
                      {client.name}
                    </option>
                  ))}
              </Field>
              <ErrorMessage name="client" component="div" />
            </div>
            <div>
              <label htmlFor="newClient">New client:</label>
              <Field type="text" name="newClient" />
              <ErrorMessage name="newClient" component="div" />
            </div>
            <div>
              <label htmlFor="projectNr">Project Nr:</label>
              <Field type="text" name="projectNr" />
              <ErrorMessage name="projectNr" component="div" />
            </div>
            <div>
              <label htmlFor="currency">Currency:</label>
              <Field name="currency" component="select">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </Field>
              <ErrorMessage name="currency" component="div" />
            </div>
            <div>
              <label htmlFor="payment">Payment:</label>
              <Field type="number" name="payment" />
              <ErrorMessage name="payment" component="div" />
            </div>
            {status && status.msg && <div>{status.msg}</div>}
            <button type="submit" disabled={isSubmitting}>
              Add
            </button>
          </Form>
        )}
      />
    )
  );
}
