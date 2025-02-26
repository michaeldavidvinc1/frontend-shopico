"use client";

import { Skeleton } from "../ui/skeleton";

export const HeaderLandingSkeleton = () => {
  return (
    <div className="w-full">
      <div className="container bg-primary/85">
        <div className="py-1 flex justify-between">
          <div className="flex gap-2 items-center">
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="mx-auto px-4 md:px-20 lg:px-24">
        {/* Skeleton untuk bagian atas */}

        {/* Skeleton untuk bagian tengah */}
        <div className="py-4 flex justify-around items-center">
          <Skeleton className="w-32 h-8 rounded-lg" />
          <Skeleton className="h-8 w-64" />
          <div className="flex gap-2 items-center">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-2 w-32" />
              <Skeleton className="h-2 w-48" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};