import React, { useState } from "react";
import { goToRightIcon, toRightIcon } from "@/components/common/icons";
import { Link } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { CategoriesType } from "@/types/types";
import { AnimatePresence, motion as m } from "framer-motion";
import { twJoin } from "tailwind-merge";
import { mCategories, mSetting } from "@/utils/motionSettings";

type CategoriesHomeProps = {
  categories: CategoriesType[] | null;
};

const CategoriesHome: React.FC<CategoriesHomeProps> = ({ categories }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-neutral lg:hidden">
      <h2
        onClick={() => setOpen(!open)}
        className="relative mx-auto w-fit cursor-pointer py-4 text-center text-2xl"
      >
        Categories
        <span
          className={twJoin(
            "absolute -right-5 top-[17px] scale-90",
            open && "rotate-90",
          )}
        >
          {toRightIcon}
        </span>
      </h2>
      <AnimatePresence>
        {open && (
          <div className="text-md grid grid-cols-filterLayout gap-x-4 gap-y-4 border-neutral pb-8 font-Merriweather max-lg:container lg:gap-y-10 lg:border-b lg:pb-14">
            {categories?.map(({ id, name, image }) => (
              <Link
                to={`/products/categories/${id}`}
                key={nanoid()}
                className=""
              >
                <m.div
                  {...mCategories}
                  className="grid grid-cols-[60px_1fr] items-center gap-x-2"
                >
                  <img
                    src={image}
                    alt={name}
                    className="h-12 w-12 rounded-full"
                  />
                  <p>
                    {name} {goToRightIcon}
                  </p>
                </m.div>
              </Link>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoriesHome;
