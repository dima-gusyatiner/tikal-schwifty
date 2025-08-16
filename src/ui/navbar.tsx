import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
	return (
		<header className="border-b border-slate-400 bg-card text-card-foreground shadow">
			<div className="container px-4 mx-auto flex h-16 items-center">
				<Link
					href="/"
					className="font-bold flex items-center"
				>
					<Image
						aria-hidden
						alt="Logo"
						src="/logo.png"
						width={64}
						height={64}
						className="h-10 w-auto object-contain mr-2"
					/>
					<span className="text-xl">Tikal Schwifty</span>
				</Link>
			</div>
		</header>
	);
}
