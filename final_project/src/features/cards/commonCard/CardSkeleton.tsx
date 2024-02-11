import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type SkeletopProps = {
  isHome?: boolean;
};

const CardSkeleton: React.FC<SkeletopProps> = ({ isHome = false }) => {
  return (
    <Card className="flex h-full w-full flex-col">
      <Skeleton className="h-72 w-full bg-accent" />
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-2 w-full bg-accent" />
        </CardTitle>
        <div>
          <Skeleton className="h-2 w-8 bg-accent" />
        </div>
      </CardHeader>
      {!isHome && (
        <div className="flex flex-grow flex-col justify-between">
          <CardContent className="text-2xl">
            <Skeleton className="h-8 w-8 bg-accent" />
          </CardContent>
          <CardFooter className="space-x-4">
            <Skeleton className="h-8 w-8 bg-accent" />
            <Skeleton className="h-8 w-8 bg-accent" />
          </CardFooter>
        </div>
      )}
    </Card>
  );
};

export default CardSkeleton;
