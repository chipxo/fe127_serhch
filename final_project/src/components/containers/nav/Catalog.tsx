import React, { useState } from "react";
import { catalogIcon, toRightIcon } from "../../common/icons.tsx";
import { Link } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { AnimatePresence, motion as m } from "framer-motion";
import { CategoriesType } from "../../../types/types";

type CatalogProps = {
  categories: CategoriesType[] | null;
};

const Catalog: React.FC<CatalogProps> = ({ categories }) => {
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
          <m.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ x: "-50%" }}
            className="absolute left-1/2 top-12"
          >
            <div className="absolute -top-8 z-[999] h-8 w-full bg-transparent" />
            <div className="grid cursor-pointer gap-y-4 rounded-md border-4 border-neutral bg-base-100 p-4">
              <div className="border-b border-neutral lg:border-none">
                <div className="text-md grid grid-cols-filterLayout gap-x-4 gap-y-4 border-neutral font-Merriweather max-lg:container lg:gap-y-10">
                  {categories?.map(({ id, name }) => (
                    <Link to={`/products/categories/${id}`} key={nanoid()}>
                      {name[0].toUpperCase() + name.slice(1)} {toRightIcon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Catalog;
