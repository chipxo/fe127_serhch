import { ErrorMessage, Field } from "formik";

const Input = ({ type, placeholder, name, className, errorClassName }) => {
  return (
    <div className="relative">
      <Field
        type={type}
        placeholder={placeholder}
        name={name}
        className={className}
      />
      <ErrorMessage name={name} component="div" className={errorClassName} />
    </div>
  );
};

export default Input;
