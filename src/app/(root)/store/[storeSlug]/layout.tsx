import type {Metadata} from "next";
import '@/app/globals.css';
import ReduxProvider from "@/providers/redux";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Outfit} from "next/font/google";
import {Toaster} from "sonner";
import StoreSwitcher from "@/app/(root)/store/[storeSlug]/components/store-switcher";
import MainNav from "@/app/(root)/store/[storeSlug]/components/main-nav";
import NotificationButton from "@/app/(root)/store/[storeSlug]/components/notification";
import UserNav from "@/app/(root)/store/[storeSlug]/components/user-nav";

const outfitFont = Outfit({
    subsets: ['latin']
});


export const metadata: Metadata = {
    title: "Shopico",
    description: "Ecommerce Shopico",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body
            className={`${outfitFont.className} antialiased`}
        >
        <ReduxProvider>
            <Toaster position="top-right" richColors/>
            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <StoreSwitcher />
                        <MainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4">
                            <NotificationButton />
                            <UserNav />
                        </div>
                    </div>
                </div>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    {children}
                </div>
            </div>
        </ReduxProvider>
        </body>
        </html>
    );
}
