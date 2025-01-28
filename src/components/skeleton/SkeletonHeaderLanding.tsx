"use client";

import { Skeleton } from "../ui/skeleton";

export const HeaderLandingSkeleton = () => {
  return (
    <div className="w-full">
      <div className="mx-auto px-4 md:px-20 lg:px-24">
        {/* Skeleton untuk bagian atas */}
        <div className="py-1 flex justify-between">
          <div className="flex text-muted-foreground gap-2 items-center">
            <Skeleton className="h-2 w-32" />
          </div>
          <Skeleton className="h-2 w-24" />
        </div>

        {/* Skeleton untuk bagian tengah */}
        <div className="py-4 flex justify-between items-center">
          <Skeleton className="w-16 h-16 rounded-full" />
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

      {/* Skeleton untuk bagian bawah */}
      <div className="w-full bg-primary/85 py-4 px-4 md:px-20 lg:px-24 mx-auto text-white">
        <div className="flex justify-between items-stretch">
          <div className="flex gap-4 -my-3">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
          <div className="flex gap-6">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};