import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Provider } from "./provider";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

const plus_jakarta_sans = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Arsipkan",
	description: "Pengarsipan. Ter-automasi.",
};

export default function RootLayout({
	children,
	}: Readonly<{
	children: React.ReactNode;
	}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					plus_jakarta_sans.variable
				)}
			>
				<Provider>
				<>
					<Header />
					{children}
					<Toaster />
				</>
				</Provider>
			</body>
		</html>
	);
}
