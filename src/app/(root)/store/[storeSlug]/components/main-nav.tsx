import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";
import {FC} from "react";
import {ChevronDown} from "lucide-react";
import {ROUTES} from "@/constant";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    storeSlug: string;
}

const MainNav: FC<MainNavProps> = ({className, storeSlug, ...props}) => {
    const links = [
        {
            label: "Dashboard",
            path: ROUTES.DASHBOARD_STORE(storeSlug),
        },
        {
            label: "Product",
            path: ROUTES.PRODUCT_SELLER(storeSlug),
        },
        {
            label: "Product asd",
            children: [
                {
                    label: "Product asdd",
                    path: "/",
                },
                {
                    label: "Tambah Product",
                    path: "/",
                },
            ],
        },
    ];
    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            {links.map((item) => {
                return (
                    <div key={item.label}>
                        {!item.children && (
                            <Link
                                href={item.path}
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                {item.label}
                            </Link>
                        )}
                        {item.children && (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                  <span className="text-sm font-medium transition-colors hover:text-primary flex gap-2 items-center">
                                    {item.label}
                                      <ChevronDown className="w-4 h-4" />
                                  </span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    {item.children.map((menu) => (
                                        <DropdownMenuItem key={menu.label}>
                                            <Link
                                                href={menu.path}
                                                className="text-sm font-medium transition-colors hover:text-primary"
                                            >
                                                {menu.label}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default MainNav;
