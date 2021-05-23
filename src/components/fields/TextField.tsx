import { Form } from "@themesberg/react-bootstrap";
import { useField } from "formik";
import React from "react";

type FieldProps = {
  label: string;
  name: string;
  placeholder: string;
  type: "text" | "email" | "password";
  autoComplete?: "off" | "on";
  autoFocus?: boolean;
  disabled?: boolean;
};

export const TextField: React.FC<FieldProps> = ({
  label,
  name,
  placeholder,
  type,
  autoComplete = "off",
  autoFocus = false,
  disabled = false,
}): JSX.Element => {
  const [field, meta] = useField({ name, type });
  const hasError = !!meta.error && meta.touched;
  return (
    <Form.Group id={field.name} className="mb-4">
      <Form.Label htmlFor={field.name} className={hasError ? "text-danger" : ""}>
        {label}
      </Form.Label>
      <Form.Control
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        isInvalid={hasError}
        {...field}
      />
      {hasError && <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>}
    </Form.Group>
  );
};

export default TextField;
