import { ErrorMessage, Field } from "formik";

const Input = ({ type, placeholder, name }) => {
  return (
    <div className="relative">
      <Field
        type={type}
        placeholder={placeholder}
        name={name}
        className="relative w-full  rounded-none border-b bg-white px-2 py-4 transition duration-200 hover:border-b-dark-blue focus:border-b-dark-blue focus:outline-none"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="absolute top-16 text-red-600"
      />
    </div>
  );
};

export default Input;
