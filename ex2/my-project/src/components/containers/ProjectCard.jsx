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

  const bgColorandPosition = isNumber
    ? "bg-mid-purple left-20"
    : "bg-light-blue right-20";

  const cardDirection = isNumber ? "md:flex-row-reverse" : "md:flex-row";

  return (
    <div
      className={`relative flex flex-col justify-between gap-x-[30px] gap-y-6 lg:gap-x-[70px] ${cardDirection}`}
    >
      <div className="relative">
        {/* Card image */}
        <img
          src={image}
          alt={title}
          className="relative z-50 w-full object-cover"
        />
        {/* Image background */}
        <div
          className={`absolute -top-7 z-10 hidden h-72 w-[30rem] md:block lg:-top-12 lg:aspect-video lg:h-auto lg:w-[38rem] xl:-top-16 xl:w-[48rem] 2xl:w-[56rem] ${bgColorandPosition}`}
        ></div>
      </div>
      <div className="grid items-center justify-items-start gap-y-4">
        <div className="grid gap-y-6">
          {/* Subtitle */}
          <SubTitle isLong={true} text={subTitle} />

          {/* Title and description */}
          <SectionsTitle text={title} isBgDark={false} isTitle={false} />
          <div className="w-full max-w-[470px]">
            <p>{description}</p>
            {/* Hidden description */}
            {details && (
              <p>
                {description}
                {description}
                {description}
              </p>
            )}
          </div>
        </div>
        <Button
          text={`${details ? "less" : "more"} details`}
          isActive={details}
          onClick={() => setDetails(!details)}
        />

        {/* Location */}
        <a href={href} className="location relative ml-6">
          <span className="absolute -left-6 text-[15px] text-dark-blue">
            <FontAwesomeIcon icon={faLocationDot} />
          </span>
          {location}
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
