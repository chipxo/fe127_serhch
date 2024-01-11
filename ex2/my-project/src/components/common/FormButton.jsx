const FormButton = ({ disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`border border-dark-blue from-mid-purple to-light-blue px-6 py-2 font-[Montserrat] uppercase transition-all hover:border-white hover:bg-gradient-to-br hover:text-white md:mt-8 md:px-10 md:py-3 ${
        disabled &&
        "opacity-60 hover:border-dark-blue hover:from-white hover:to-white hover:text-black"
      }`}
    >
      Submit
    </button>
  );
};

export default FormButton;
