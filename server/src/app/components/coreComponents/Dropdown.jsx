import React from "react";
import { Field, ErrorMessage } from "formik";

const Dropdown = ({ name, label, options, ...rest }) => (
  <div className="form-group mb-3">
    <label className="ms-2 form-label" htmlFor={name}>{label}</label>

    <Field as="select" id={name} name={name} className="form-control" {...rest}>
      <option value="">Select...</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Field>
    <ErrorMessage name={name} component="div" className="text-danger" />
  </div>
);

export default Dropdown;
