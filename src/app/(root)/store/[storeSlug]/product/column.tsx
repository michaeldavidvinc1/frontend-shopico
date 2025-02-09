import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constant";
import { Product } from "@/interface/product";
import { formatRupiah } from "@/utils/format-rupiah";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "no",
        header: ({column} ) => {
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
        header: ({ column }) => {
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
        cell: ({ row }: { row: Row<Product> }) => {
            const name = row.getValue<string>("name");
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
        accessorKey: "stock",
        header: "Stock",
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }: { row: Row<Product> }) => {
            const price = row.getValue<number>("price");
            
            return formatRupiah.format(price)
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: Row<Product> }) => {
            const status = row.getValue<string>("status");
            
            return <Badge variant={status === 'ACTIVE' ? 'active' : 'destructive'} className="capitalize">{status.toLowerCase()}</Badge> 
        }
    },
    {
        id: "actions",
        cell: ({ row }: { row: Row<Product> }) => {
            const dataRow = row.original;
            const router = useRouter();

            const handleEdit = (slug: string) => {
                router.push(ROUTES.EDIT_PRODUCT_SELLER(dataRow.storeId, slug))
            }

            // const handleDelete = (id) => {
            //     Swal.fire({
            //         title: "Are you sure?",
            //         text: "You cannot undo this data again!",
            //         icon: "warning",
            //         showCancelButton: true,
            //         confirmButtonColor: "#3085d6",
            //         cancelButtonColor: "#d33",
            //         confirmButtonText: "Iya, Hapus",
            //         cancelButtonText: "Batal",
            //     }).then(async (result) => {
            //         if (result.isConfirmed) {
            //         }
            //     });
            // };
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <span
                                className=" flex gap-2 items-center cursor-pointer"
                                onClick={() => handleEdit(dataRow.slug)}
                            >
                                <Edit className="w-4" /> Edit
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span
                                className=" flex gap-2 items-center cursor-pointer text-red-500"
                                // onClick={() => handleDelete(dataRow.id)}
                            >
                                <Trash2 className="w-4" /> Delete
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
