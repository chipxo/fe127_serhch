import { RootState } from "@/app/rootReducer.tsx";
import { useAppDispatch } from "@/app/store.tsx";
import ErrorMessage from "@/components/common/ErrorMessage";
import Gallery from "@/components/containers/gallery/Gallery.tsx";
import SingleCard from "@/features/cards/singleCard/SingleCard";
import SingleCardSkeleton from "@/features/cards/singleCard/SingleCardSkeleton.tsx";
import { fetchProduct } from "@/hooks/fetchProduct.tsx";
import { ProductType } from "@/types/types";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleCardPage = () => {
  const dispatch = useAppDispatch();

  const { product, loading, error } = useSelector(
    (state: RootState) => state.product,
  );

  const [open, setOpen] = useState(false);

  const { prodId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProduct(Number(prodId)));
  }, [dispatch]);

  return (
    <>
      <AnimatePresence>
        {open && product && (
          <Gallery
            title={product.title}
            images={product.images}
            handleCloseGallery={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
      <section>
        <div className="container">
          {loading && <SingleCardSkeleton />}
          {error && <ErrorMessage error={error} />}
          {!loading && !error && (
            <SingleCard
              {...(product as ProductType)}
              handleGalleryClick={() => setOpen(true)}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default SingleCardPage;
