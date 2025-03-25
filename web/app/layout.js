import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ConditionalScripts from "@/components/ConditionalScripts"; // 👈 use wrapper here

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Abdullah Balbaid",
  description: "Personal website of Abdullah Balbaid",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ConditionalScripts />{" "}
          {/* ✅ This is now a client component that uses `usePathname()` safely */}
        </ThemeProvider>
      </body>
    </html>
  );
}
