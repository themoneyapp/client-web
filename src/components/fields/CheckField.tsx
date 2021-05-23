import { Form, FormCheck } from "@themesberg/react-bootstrap";
import { useField } from "formik";
import React from "react";

type FieldProps = {
  name: string;
  label: string;
  type?: "checkbox";
  disabled?: boolean;
};

export const CheckField: React.FC<FieldProps> = ({
  label,
  name,
  disabled = false,
  type = "checkbox",
}): JSX.Element => {
  const [field] = useField({ name, type });

  return (
    <Form.Check type={type}>
      <FormCheck.Input disabled={disabled} className="me-2" {...field} />
      <FormCheck.Label htmlFor={field.name} className="mb-0">
        {label}
      </FormCheck.Label>
    </Form.Check>
  );
};

export default CheckField;
