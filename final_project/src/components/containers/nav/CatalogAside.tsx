import { goToRightIcon } from "../../common/icons/Icons";
import { Link } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { CategoriesProductType } from "../../types/CategoriesTypes";
import { isValidImage } from "../../functions/isValidImage";

type FilterProps = {
  categories: CategoriesProductType[] | null;
};

const FilterItemAside = ({ categories }: FilterProps) => {
  return (
    <div className="border-b border-neutral lg:hidden">
      <h2 className="mt-4 text-center text-2xl">Categories :</h2>
      <div className="grid-cols-filterLayout text-md grid gap-x-4 gap-y-4 border-neutral py-8 font-Merriweather max-lg:container lg:gap-y-10 lg:border-b lg:py-14">
        {categories?.map(
          ({ id, name, image }: CategoriesProductType) =>
            isValidImage(image) && (
              <Link
                to={`/products/categories/${id}`}
                key={nanoid()}
                className=""
              >
                <div className="grid grid-cols-[60px_1fr] items-center gap-x-2">
                  <img
                    src={image}
                    alt={name}
                    className="h-12 w-12 rounded-full"
                  />
                  <p>
                    {name[0].toUpperCase() + name.slice(1)} {goToRightIcon}
                  </p>
                </div>
              </Link>
            ),
        )}
      </div>
    </div>
  );
};

export default FilterItemAside;
