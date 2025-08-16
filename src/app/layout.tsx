import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cn, Footer, Navbar } from '@/ui';
import { Providers } from './providers';

import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Tikal Schwifty',
	description: 'Morty is getting Schwifty again!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className="h-full bg-slate-950 text-slate-100"
		>
			<body
				className={cn(
					geistSans.variable,
					geistMono.variable,
					'antialiased flex min-h-screen flex-col',
				)}
			>
				<Providers>
					<Navbar />
					<main className="flex-1 container mx-auto p-4">{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
