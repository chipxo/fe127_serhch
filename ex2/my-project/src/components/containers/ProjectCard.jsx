import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Button from "../common/CommonButton";
import SectionsTitle from "../common/SectionsTitle";
import SubTitle from "../common/SubTitle";

const ProjectCard = ({
  subTitle,
  title,
  description,
  location,
  image,
  href,
  isNumber,
}) => {
  const [details, setDetails] = useState(false);

  const bgPosition = isNumber ? "left-20" : "right-20";

  const bgColor = isNumber ? "bg-mid-purple" : "bg-light-blue";

  return (
    <div
      className={`relative flex flex-col justify-between gap-x-[30px] gap-y-6 lg:gap-x-[70px] ${
        isNumber ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="relative">
        {/* Card image */}
        <img src={image} alt={title} className="w-full object-cover" />

        {/* Image background */}
        <div
          className={`absolute -top-7 -z-[10] hidden h-72 w-[30rem] md:block lg:-top-12 lg:aspect-video lg:h-auto lg:w-[38rem] xl:-top-16 xl:w-[48rem] 2xl:w-[56rem] ${bgColor} ${bgPosition}`}
        ></div>
      </div>
      <div className="grid items-center justify-items-start gap-y-4">
        <div className="grid gap-y-6">
          {/* Subtitle */}
          <SubTitle isLong={true} text={subTitle} />

          {/* Title and description */}
          <SectionsTitle text={title} isBgDark={false} isTitle={false} />
          <p className="w-full max-w-[470px]">{description}</p>

          {/* Hidden description */}

          {details && (
            <p className="w-full max-w-[470px]">
              {description}
              {description}
              {description}
            </p>
          )}
        </div>
        <Button
          onClick={() => setDetails(!details)}
          text={`${details ? "less" : "more"} details`}
          isActive={details}
        />

        {/* Location */}
        <a href={href} className="location relative ml-6">
          <span className="text-dark-blue absolute -left-6 text-[15px]">
            <FontAwesomeIcon icon={faLocationDot} />
          </span>
          {location}
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
