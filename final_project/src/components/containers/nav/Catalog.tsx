import { useState } from "react";
import { catalogIcon, toRightIcon } from "../../common/icons/Icons";
import links from "../../data/filter.json";
import { Link } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { AnimatePresence, motion } from "framer-motion";
import { CategoriesProductType } from "../../types/CategoriesTypes";

type FilterProps = {
  categories: CategoriesProductType[] | null;
};

const Catalog = ({ categories }: FilterProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative hidden lg:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <h2 className="flex items-center gap-x-3 text-lg">
        <span className="text-2xl">{catalogIcon}</span> Catalog
      </h2>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ x: "-50%" }}
            className="absolute left-1/2 top-12"
          >
            <div className="absolute -top-8 z-[999] h-8 w-full bg-transparent" />
            <div className="grid cursor-pointer gap-y-4 rounded-md border-4 border-neutral bg-base-100 p-4">
              <div className="border-b border-neutral lg:border-none">
                <div className="grid-cols-filterLayout text-md grid gap-x-4 gap-y-4 border-neutral font-Merriweather max-lg:container lg:gap-y-10">
                  {categories?.map(({ id, name }: CategoriesProductType) => (
                    <Link
                      to={`/products/categories/${id}`}
                      key={nanoid()}
                      className=""
                    >
                      {name[0].toUpperCase() + name.slice(1)} {toRightIcon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Catalog;

//  <p className="border-y border-neutral px-10 py-4">
// {toRightIcon} Clothes
// </p>
<div>
  <h2 className="border-l border-neutral px-4 pb-3 pt-4">Sort by:</h2>
  <div className="collapse mb-1 rounded-none border border-neutral bg-base-100 p-0">
    <input type="radio" name="my-accordion-1" />
    <div className="collapse-title border-b border-neutral text-xl font-medium ">
      <h2 className="pl-2 font-Roboto-Condensed text-3xl">Categories :</h2>
    </div>
    <div className="collapse-content grid p-0 font-Merriweather text-xl">
      {links.map(({ id, name }) => (
        <Link
          to={`/products/categories/${id}`}
          key={nanoid()}
          className="border-y border-neutral px-10 py-4"
        >
          {toRightIcon} {name[0].toUpperCase() + name.slice(1)}
        </Link>
      ))}
    </div>
  </div>
  <div className="collapse rounded-none border border-neutral bg-base-100 p-0">
    <input type="radio" name="my-accordion-1" />
    <div className="collapse-title border-y border-neutral text-xl font-medium">
      <h2 className="pl-2 font-Roboto-Condensed text-3xl">Price :</h2>
    </div>
    <div className="collapse-content p-0 font-Merriweather text-2xl">
      <p className="border-y border-neutral px-10 py-4">Enter values:</p>
      <div className="grid grid-cols-2 gap-x-10 p-4">
        <input
          className="rounded-md border border-neutral bg-base-200 p-4"
          placeholder="Lowest"
        />
        <input
          className="rounded-md border border-neutral bg-base-200 p-4"
          placeholder="Highest"
        />
      </div>
    </div>
  </div>
</div>;
