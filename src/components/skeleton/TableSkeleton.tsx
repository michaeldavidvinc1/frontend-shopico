import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full overflow-hidden border rounded-lg">
      <table className="w-full border-collapse">
        {/* Table Header Skeleton */}
        <thead>
          <tr className="border-b bg-gray-100">
            {["", "", "", ""].map((_, i) => (
              <th key={i} className="p-3 text-center">
                <Skeleton className="h-5 w-16 mx-auto" />
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body Skeleton */}
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="border-b">
              <td className="p-3">
                <div className="flex justify-center">
                  <Skeleton className="h-10 w-10 rounded-md" />
                </div>
              </td>
              <td className="p-3 text-center">
                <Skeleton className="h-5 w-32 mx-auto" />
              </td>
              <td className="p-3 text-center">
                <Skeleton className="h-5 w-20 mx-auto" />
              </td>
              <td className="p-3 text-center">
                <Skeleton className="h-5 w-24 mx-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
