const SubTitle = ({ isLong, text }) => {
  const fontSize = isLong ? "22px" : "18px";

  return (
    <h3 className={`-mb-6 text-sm uppercase lg:text-[${fontSize}]`}>{text}</h3>
  );
};

export default SubTitle;
