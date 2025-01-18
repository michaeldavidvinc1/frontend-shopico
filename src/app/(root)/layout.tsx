import type { Metadata } from "next";
import '@/app/globals.css';
import ReduxProvider from "@/providers/redux";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Outfit } from "next/font/google";

const outfitFont = Outfit({
  subsets: ['latin']
});


export const metadata: Metadata = {
  title: "Shopico",
  description: "Ecommerce Shopico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfitFont.className} antialiased`}
      >
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
