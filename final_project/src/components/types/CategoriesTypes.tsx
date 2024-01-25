export type CategoriesProductType = {
  id: number;
  name: string;
  image: string;
};

export type CategoriesState = {
  categories: CategoriesProductType[] | null;
  loading: boolean;
  error: string | null | {};
};
