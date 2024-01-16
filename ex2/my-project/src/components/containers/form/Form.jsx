import { Formik } from "formik";
import FormButton from "./FormButton";
import Input from "./Input";

const Form = () => {
  const initialValues = {
    userName: "",
    email: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.userName) {
      errors.userName = "Name is required";
    } else if (values.userName.trim().length < 2) {
      errors.userName = "Name must be at least 2 characters long";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email.trim())
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const submitForm = (values, { setSubmitting, resetForm }) => {
    resetForm();
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitForm}
    >
      {({ isValid, handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className="grid gap-x-16 gap-y-8 font-[Montserrat] text-black sm:grid-cols-2 md:grid-cols-1"
        >
          <Input type="text" name="userName" placeholder="Name" />
          <Input type="text" name="email" placeholder="Email" />

          <div className="mt-2 sm:mt-8 md:m-0 md:place-self-end">
            <FormButton disabled={!isValid} />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Form;
