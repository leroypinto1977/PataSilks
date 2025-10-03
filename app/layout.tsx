import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Inter, Crimson_Text } from "next/font/google";
import AuthProviderWrapper from "@/components/auth-provider";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { ConditionalLayout } from "@/components/layout/conditional-layout";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Patta Silks - Luxury Indian Sarees & Textiles",
  description:
    "Discover exquisite handwoven sarees, lehengas, and traditional Indian textiles crafted with premium silk. Shop authentic Indian fashion online.",
  keywords:
    "sarees, silk sarees, Indian textiles, traditional wear, handwoven sarees, wedding sarees, party wear",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${crimsonText.variable}`}
    >
      <body className="min-h-screen bg-white text-gray-900 font-sans">
        <AuthProviderWrapper>
          <CartProvider>
            <WishlistProvider>
              <ConditionalLayout>{children}</ConditionalLayout>
              <Toaster position="bottom-right" />
            </WishlistProvider>
          </CartProvider>
        </AuthProviderWrapper>
      </body>
    </html>
  );
}
