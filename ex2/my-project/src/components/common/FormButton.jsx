const FormButton = ({ disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`border border-dark-blue from-mid-purple to-light-blue px-6 py-2 font-[Montserrat] uppercase transition-all hover:border-white hover:bg-gradient-to-br hover:text-white md:mt-8 
      ${
        disabled &&
        "disabled:opacity-60 disabled:hover:border-dark-blue disabled:hover:from-white disabled:hover:to-white disabled:hover:text-black"
      } 
        md:px-10 md:py-3`}
    >
      Submit
    </button>
  );
};

export default FormButton;
