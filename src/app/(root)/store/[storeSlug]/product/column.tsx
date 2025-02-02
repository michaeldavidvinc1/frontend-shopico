import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/utils/format-rupiah";
import { ArrowUpDown } from "lucide-react";

export const columns = [
    {
        accessorKey: "no",
        header: ({ column }: any) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    No
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }: any) => row.index + 1,
    },
    {
        accessorKey: "name",
        header: ({ column }: any) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Product
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }: any) => {
            const name = row.getValue("name");
            const image = row.original.image?.[0]?.url;
            
            return (
                <div className="flex items-center space-x-2">
                    {image && <img src={image} alt={name} className="w-10 h-10 rounded-md object-cover" />}
                    <span>{name}</span>
                </div>
            );
        }
    },
    {
        accessorKey: "category.name",
        header: "Category",
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }: any) => {
            const price = row.getValue("price");
            
            return formatRupiah.format(price)
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: any) => {
            const status = row.getValue("status");
            
            return <Badge variant={status === 'ACTIVE' ? 'default' : 'destructive'} className="capitalize">{status.toLowerCase()}</Badge> 
        }
    },
];
