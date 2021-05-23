import { Alert, Col, Row, Form, Button, Container } from "@themesberg/react-bootstrap";
import { withFormik, FormikProps } from "formik";
import { useState, SetStateAction, Dispatch } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import BgImage from "src/assets/illustrations/signin.svg";
import { TextField } from "src/components/fields";
import { ROUTES } from "src/constants/menu";
import { useUserStore } from "src/store";

interface FormProps {
  handleLogin: (email: string, password: string) => Promise<void>;
  setGlobalError: Dispatch<SetStateAction<string | null>>;
}

interface FormValues {
  email: string;
  password: string;
}

interface ServerErrors extends FormValues {
  message: string | null;
}

const initialValues: FormValues = {
  email: "",
  password: "",
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const InnerForm = (props: FormikProps<FormValues>): JSX.Element => {
  const { handleSubmit, isSubmitting } = props;

  return (
    <Form className="mt-4" onSubmit={handleSubmit}>
      <TextField
        autoComplete="off"
        autoFocus={true}
        label="Your Email"
        name="email"
        placeholder="user@example.com"
        type="email"
        disabled={isSubmitting}
      />
      <TextField
        autoComplete="off"
        label="Your Password"
        name="password"
        placeholder="Password"
        type="password"
        disabled={isSubmitting}
      />

      <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
        {isSubmitting && (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        )}
        {!isSubmitting && <span>Sign in </span>}
      </Button>
    </Form>
  );
};

const LoginForm = withFormik<FormProps, FormValues>({
  handleSubmit: async (values, { props, resetForm, setErrors }): Promise<void> => {
    await props
      .handleLogin(values.email, values.password)
      .then(() => resetForm())
      .catch(({ message = null, ...fieldErrors }: ServerErrors) => {
        props.setGlobalError(message);
        setErrors(fieldErrors);
      });
  },
  mapPropsToValues: () => initialValues,
  validationSchema: LoginSchema,
})(InnerForm);

export default (): JSX.Element => {
  const handleLogin = useUserStore((s) => s.login);
  const [globalError, setGlobalError] = useState<string | null>(null);

  return (
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
      <Container>
        <Row
          className="justify-content-center form-bg-image"
          style={{ backgroundImage: `url(${BgImage})` }}
        >
          <Col xs={12} className="d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
              <div className="text-center text-md-center mb-4 mt-md-0">
                <h3 className="mb-0">Sign in to our platform</h3>
              </div>
              {globalError && <Alert variant="danger">{globalError}</Alert>}
              <LoginForm handleLogin={handleLogin} setGlobalError={setGlobalError} />
              <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
                <span className="fw-normal">
                  <Button
                    as={Link}
                    to={ROUTES.DASHBOARD.path}
                    type="button"
                    variant="outline-dark"
                    size="sm"
                  >
                    {` Lost Password? `}
                  </Button>
                </span>
                <span className="fw-normal">
                  <Button
                    as={Link}
                    to={ROUTES.DASHBOARD.path}
                    type="button"
                    variant="outline-dark"
                    size="sm"
                  >
                    {` Create account `}
                  </Button>
                </span>
              </div>
              <div className="d-flex justify-content-center align-items-center mt-4"></div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
