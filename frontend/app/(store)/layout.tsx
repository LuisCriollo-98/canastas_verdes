import ShoppingCart from "@/components/cart/ShoppingCart";
import MainNav from "@/components/ui/MainNav";
import CategorySidebar from "@/components/ui/CategorySidebar";
import ToastNotification from "@/components/ui/ToastNotification";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <MainNav />
            <main className="lg:flex lg:h-screen lg:overflow-y-hidden">
                <CategorySidebar />
                <div className="flex-1 md:h-screen md:overflow-y-scroll pt-10 pb-32 px-10">
                    {children}
                </div>
                <aside className="md:w-96 md:h-screen md:overflow-y-scroll pt-10 pb-32 px-5 bg-white">
                    <ShoppingCart />
                </aside>
            </main>
            <ToastNotification />
        </>
    );
}