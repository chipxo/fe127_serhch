import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SliderSkeleton = () => {
  return (
    <div className="flex gap-2 border-y py-2">
      {"qwer".split("").map((char) => (
        <Card key={char} className="flex h-full w-full flex-col">
          <Skeleton className="h-40 w-full bg-accent" />
        </Card>
      ))}
    </div>
  );
};

export default SliderSkeleton;
