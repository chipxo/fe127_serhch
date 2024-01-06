import SubTitle from "../../common/SubTitle";

const Slide = ({
  id,
  image,
  title,
  description,
  userName,
  data,
  userPhoto,
}) => {
  return (
    <div className="mx-auto mb-12 max-w-[370px] bg-white transition-all">
      <img src={image} alt={title} className="h-44 w-full object-cover" />
      <div className="flex flex-col gap-y-4 px-5 py-5">
        <h2 className="text-dark-blue text-[18px] font-bold uppercase md:text-[22px]">
          {title}
        </h2>
        <p>{description}</p>
        <div className="mt-2 flex items-center gap-x-4 md:mt-4">
          <img
            src={userPhoto}
            alt={`photo of ${userName}`}
            className="rounded-full"
          />
          <div className="grid items-center gap-y-7">
            <SubTitle text={userName} isLong={false} />
            <p className="text-light-blue font-[Montserrat]">{data}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
