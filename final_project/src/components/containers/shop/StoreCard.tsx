import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

interface StoreCardProps {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

const StoreCard = ({
  category,
  image,
  price,
  rating,
  title,
}: StoreCardProps) => {
  const randomNum = Math.floor(Math.random() * 50);
  return (
    <div className="card w-full bg-base-100 shadow-2xl">
      <figure>
        <img
          src={image}
          className="h-80 w-full bg-white object-contain p-4"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <div className="card-actions">
          <div className="badge badge-outline border-primary p-3">
            {category}
          </div>
        </div>
        <h2 className="card-title gap-8">
          {title}
          <div className="badge badge-secondary">{rating.rate}</div>
        </h2>
        <div className="card-actions mt-2">
          <div className="badge badge-outline border-neutral p-3 opacity-60">
            <span className="line-through">
              ${Math.floor(price + price / randomNum)}
            </span>
          </div>
          <div className="badge badge-outline border-secondary p-3">
            ${price}
          </div>
          <div className="badge badge-outline ml-auto border-accent p-3">
            <FontAwesomeIcon className="mr-2" icon={faUser} /> {rating.count}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
