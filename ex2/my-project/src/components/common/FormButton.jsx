const FormButton = ({ disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`to-light-blue from-mid-purple border px-6 py-2 font-[Montserrat] uppercase transition-all hover:bg-gradient-to-br hover:text-white md:mt-8 ${
        disabled
          ? "disabled:opacity-60 disabled:hover:from-white disabled:hover:to-white disabled:hover:text-black"
          : ""
      } md:px-10 md:py-3`}
    >
      Submit
    </button>
  );
};

export default FormButton;
