import React, { useState } from "react";
import { toRightIcon } from "@/components/common/icons";
import { Link } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { AnimatePresence, motion as m } from "framer-motion";
import { CategoriesType } from "@/types/types";
import { mFLoatMenu } from "@/utils/motionSettings";
import { Button } from "@/components/ui/button";

type CategoriesProps = {
  categories: CategoriesType[] | null;
};

const CategoriesNav: React.FC<CategoriesProps> = ({ categories }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative hidden lg:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <h2 className="flex cursor-pointer items-center gap-x-3 text-lg">
        Categories
      </h2>
      <AnimatePresence>
        {open && (
          <m.div
            {...mFLoatMenu}
            style={{ x: "-50%" }}
            className="absolute left-1/2 top-10  rounded-md border bg-background"
          >
            <div className="absolute -top-6 z-[9999] h-8 w-full bg-transparent" />
            <div className="grid max-h-[60vh] cursor-pointer gap-y-4 overflow-auto rounded-md p-4">
              <div className="border-b lg:border-none">
                <div className="text-md grid grid-cols-filterLayout gap-x-4 gap-y-4 font-Merriweather max-lg:container lg:gap-y-4">
                  {categories?.map(({ id, name }) => (
                    <Link to={`/products/categories/${id}`} key={nanoid()}>
                      <Button variant="ghost">
                        {name}
                        <span className="ml-2 mt-0.5">{toRightIcon}</span>
                      </Button>
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

export default CategoriesNav;
