"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="w-64 p-4 bg-white rounded-lg shadow-sm border">
      {/* Header with icons */}
      <div className="flex justify-end items-center mb-4">
        <Skeleton className="w-5 h-5 rounded-full" />
      </div>

      {/* Product Image */}
      <div className="flex justify-center mb-4">
        <Skeleton className="w-full h-48 rounded-md" />
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-2">
        <Skeleton className="w-1/3 h-4" />
        <Skeleton className="w-2/3 h-6" />
        <div className="flex items-center gap-2">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-6 h-4" />
        </div>
      </div>

      <div className="flex justify-between items-center mt-3">
        <Skeleton className="w-12 h-6" />
        <Skeleton className="w-16 h-6 rounded-sm" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
