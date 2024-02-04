import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";

import { RootState } from "@/app/rootReducer.tsx";
import { useAppDispatch } from "@/app/store.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { setAlertText, showAlert } from "@/features/alert/alertSlice.tsx";
import {
  setHighestPr,
  setLowestPr,
} from "@/features/categories/categoryProducts/categoryFilteredProducts/filteredProductsSlice.tsx";
import { setCategoryProducts } from "@/features/categories/categoryProducts/categoryProductsSlice.tsx";
import { fetchFilterCategoryPrice } from "@/hooks/fetchFilterCategoryPrice.tsx";
import { ProductType } from "@/types/types.tsx";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const FilterCategories = () => {
  const dispatch = useAppDispatch();

  const { products } = useSelector(
    (state: RootState) => state.categoryProducts,
  );

  const {
    products: filteredProducts,
    lowestPr,
    highestPr,
  } = useSelector((state: RootState) => state.categoryFilteredProducts);

  const byPrice = useRef<HTMLButtonElement | null>(null);
  const [sortByPrice, setSortByPrice] = useState(false);

  const byName = useRef<HTMLButtonElement | null>(null);
  const [sortByName, setSortByName] = useState(false);

  const filterByPrice = (isReverse: boolean) => {
    if (products) {
      const sortedProducts = [...products].sort((a, b) =>
        isReverse ? a.price - b.price : b.price - a.price,
      );

      dispatch(setCategoryProducts(sortedProducts as ProductType[]));
    }
  };

  const filterByName = (isReverse: boolean) => {
    if (products) {
      const sortedProducts = [...products].sort((a, b) =>
        isReverse
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title),
      );

      dispatch(setCategoryProducts(sortedProducts as ProductType[]));
    }
  };

  const { categoryId } = useParams();

  useEffect(() => {
    dispatch(fetchFilterCategoryPrice({ lowestPr, highestPr, categoryId }));
  }, [lowestPr, highestPr, categoryId]);

  const handleFilter = () => {
    if (highestPr > lowestPr) {
      dispatch(setCategoryProducts(filteredProducts));
    } else if (highestPr && lowestPr !== 0) {
      dispatch(setAlertText("Highest price has to be more than lowest"));
      dispatch(showAlert(true));
    }
  };

  return (
    <Accordion type="single" collapsible className="mb-6">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <h2>Filter</h2>
        </AccordionTrigger>
        <AccordionContent className="px-2">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-2">
              <AccordionTrigger
                ref={byPrice}
                onClick={() => {
                  setSortByPrice((pr) => !pr);
                  sortByName && byName.current?.click();
                }}
              >
                By price
              </AccordionTrigger>
              <AccordionContent className="px-2 py-2">
                <RadioGroup defaultValue="">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="default"
                      id="r1"
                      onClick={() => filterByPrice(false)}
                    />
                    <Label htmlFor="r1">Highest to lowest</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="comfortable"
                      id="r2"
                      onClick={() => filterByPrice(true)}
                    />
                    <Label htmlFor="r2">Lowest to highest</Label>
                  </div>
                </RadioGroup>
                <p className="my-4  text-center text-lg">or</p>
                <div className="mb-2 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                  <Input
                    name="lowestPr"
                    placeholder="Enter lowest price"
                    value={lowestPr > 0 ? lowestPr : ""}
                    onChange={(e) =>
                      !isNaN(Number(e.target.value)) &&
                      dispatch(setLowestPr(Number(e.target.value)))
                    }
                  />
                  <Input
                    name="highestPr"
                    placeholder="Enter highest price"
                    value={highestPr > 0 ? highestPr : ""}
                    onChange={(e) =>
                      !isNaN(Number(e.target.value)) &&
                      dispatch(setHighestPr(Number(e.target.value)))
                    }
                  />
                </div>
                <Button
                  onClick={handleFilter}
                  variant="secondary"
                  className="w-full"
                >
                  Filter
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-3">
              <AccordionTrigger
                ref={byName}
                onClick={() => {
                  setSortByName((pr) => !pr);
                  sortByPrice && byPrice.current?.click();
                }}
              >
                By name
              </AccordionTrigger>
              <AccordionContent className="px-2 py-2">
                <RadioGroup defaultValue="">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="default"
                      id="r3"
                      onClick={() => filterByName(true)}
                    />
                    <Label htmlFor="r3">A - Z</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="compact"
                      id="r4"
                      onClick={() => filterByName(false)}
                    />
                    <Label htmlFor="r4">Z - A</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterCategories;
