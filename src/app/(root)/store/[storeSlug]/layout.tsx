import MainNav from "./components/main-nav";
import NotificationButton from "./components/notification";
import StoreSwitcher from "./components/store-switcher";
import UserNav from "./components/user-nav";

export default async function StoreLayout({ params, children }: { params: { storeSlug: string }; children: React.ReactNode }){
    const { storeSlug } = await params;
    return (
        <div className="hidden flex-col md:flex">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <StoreSwitcher />
                    <MainNav className="mx-6" storeSlug={storeSlug} />
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
    )
}