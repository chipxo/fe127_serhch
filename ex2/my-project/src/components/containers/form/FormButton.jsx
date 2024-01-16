const FormButton = ({ disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`border border-dark-blue px-6 py-2 font-[Montserrat] uppercase transition md:mt-8 md:px-10 md:py-3 ${
        disabled
          ? "opacity-40"
          : "hover:border-white hover:bg-gradient-to-br hover:from-mid-purple hover:to-light-blue hover:text-white"
      }`}
    >
      Submit
    </button>
  );
};

export default FormButton;
