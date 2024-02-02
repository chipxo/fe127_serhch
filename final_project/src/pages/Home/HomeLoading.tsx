import SliderSkeleton from "@/components/containers/slider/SliderSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import CardSkeleton from "@/features/cards/commonCard/CardSkeleton";

const HomeLoading = () => {
  return (
    <section className="space-y-12">
      <SliderSkeleton />
      <div className="border-t pt-4">
        <Skeleton className="mx-auto h-6 w-40 bg-accent" />
      </div>
      <div className="container grid grid-cols-home gap-2">
        <CardSkeleton isHome />
      </div>
    </section>
  );
};

export default HomeLoading;
