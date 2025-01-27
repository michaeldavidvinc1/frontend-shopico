"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {useEffect, useState} from "react";

interface BreadcrumbProps {
    items: { label: string; href?: string }[];
}

function DynamicBreadcrumb({ items }: BreadcrumbProps) {
    const [clientItems, setClientItems] = useState(items);

    useEffect(() => {
        // Modify or replace `items` based on client-side data if needed
        setClientItems(items);
    }, [items]);
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {clientItems.map((item, index) => (
                    <BreadcrumbItem key={index}>
                        {item.href ? (
                            <BreadcrumbLink href={item.href} className="inline-flex items-center gap-1.5">
                                {item.label}
                            </BreadcrumbLink>
                        ) : (
                            <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        )}
                        {index < items.length - 1 && <BreadcrumbSeparator />}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export { DynamicBreadcrumb };
