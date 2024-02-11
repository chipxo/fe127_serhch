import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SingleCardSkeleton = () => {
  return (
    <Card className="grid py-6 md:grid-cols-[0.45fr_1fr] lg:grid-cols-[0.3fr_1fr]">
      <div className="px-6">
        <Skeleton className="h-[80vh] w-full bg-accent md:h-72" />
      </div>
      <div className="mt-2">
        <CardHeader>
          <Skeleton className="-mt-5 h-4 w-12 bg-accent" />
          <CardTitle>
            <Skeleton className="h-4 w-full bg-accent" />
          </CardTitle>
          <Skeleton className="h-12 w-full bg-accent" />
        </CardHeader>
        <CardContent className="text-2xl">
          <Skeleton className="h-12 w-14 bg-accent" />
        </CardContent>
        <CardFooter className="mt-20 space-x-4 pb-0">
          <Skeleton className="h-10 w-10 bg-accent" />
          <Skeleton className="h-10 w-10 bg-accent" />
        </CardFooter>
      </div>
    </Card>
  );
};

export default SingleCardSkeleton;
