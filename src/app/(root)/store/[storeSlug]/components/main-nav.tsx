import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
}

const links = [
    {
        label: "Dashboard",
        path: "/",
    },
    {
        label: "Product",
        children: [
            {
                label: "Product",
                path: "/",
            },
            {
                label: "Tambah Product",
                path: "/",
            },
        ],
    },
];

const MainNav: FC<MainNavProps> = ({ className, ...props }) => {
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
                  <span className="text-sm font-medium transition-colors hover:text-primary">
                    {item.label}
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
