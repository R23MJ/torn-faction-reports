import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-2">
      <Skeleton className="w-full h-5" />
      <Skeleton className="w-full h-5" />
      <Skeleton className="w-full h-5" />
      <Skeleton className="w-full h-5" />
      <Skeleton className="w-full h-5" />
      <Skeleton className="w-full h-5" />
      <Skeleton className="w-full h-5" />
      <Skeleton className="w-full h-5" />
    </div>
  );
}
