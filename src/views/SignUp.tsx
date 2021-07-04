import { Alert, Col, Row, Form, Button, Container, Card } from "@themesberg/react-bootstrap";
import { withFormik, FormikProps } from "formik";
import { useState, SetStateAction, Dispatch } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import BgImage from "src/assets/illustrations/signin.svg";
import { TextField } from "src/components/fields";
import { ROUTES } from "src/constants/menu";
import { useUserStore } from "src/store";
import { ServerErrors } from "src/types/common";
import { Optional } from "src/types/generic";
import { UserSignUpFormValues, UserSignUpRequest } from "src/types/user";

interface FormProps {
  onSubmit: (payload: UserSignUpRequest) => Promise<void>;
  setGlobalError: Dispatch<SetStateAction<Optional<string>>>;
}

const initialValues: UserSignUpFormValues = {
  email: "",
  full_name: "",
  password: "",
  passwordConfirmation: "",
};

const FormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  full_name: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  passwordConfirmation: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
});

const InnerForm = (props: FormikProps<UserSignUpFormValues>): JSX.Element => {
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
        label="Your Name"
        name="full_name"
        placeholder="John Doe"
        type="text"
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
      <TextField
        autoComplete="off"
        label="Confirm Password"
        name="passwordConfirmation"
        placeholder="Confirm Password"
        type="password"
        disabled={isSubmitting}
      />

      <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
        {isSubmitting && (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        )}
        {!isSubmitting && <span>Sign up </span>}
      </Button>
    </Form>
  );
};

const FormComponent = withFormik<FormProps, UserSignUpFormValues>({
  handleSubmit: async (values, { props, setErrors }): Promise<void> => {
    await props
      .onSubmit({ full_name: values.full_name, email: values.email, password: values.password })
      // .then(() => resetForm())
      .catch(({ message = null, ...fieldErrors }: ServerErrors<UserSignUpFormValues>) => {
        props.setGlobalError(message);
        setErrors(fieldErrors);
      });
  },
  mapPropsToValues: () => initialValues,
  validationSchema: FormSchema,
})(InnerForm);

export default (): JSX.Element => {
  const handleSignUp = useUserStore((s) => s.handleSignUp);
  const [globalError, setGlobalError] = useState<Optional<string>>(null);

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
                <h3 className="mb-0">Create an account</h3>
              </div>
              {globalError && <Alert variant="danger">{globalError}</Alert>}
              <FormComponent onSubmit={handleSignUp} setGlobalError={setGlobalError} />
              <div className="d-flex justify-content-center align-items-center mt-4">
                <span className="fw-normal">
                  Already have an account?
                  <Card.Link as={Link} to={ROUTES.SignIn.path} className="fw-bold">
                    {` Sign In here `}
                  </Card.Link>
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
