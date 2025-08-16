import { useMemo } from 'react';

export function Footer() {
	const currentYear = useMemo(() => new Date().getFullYear(), []);

	return (
		<footer className="border-t border-slate-400 bg-card text-card-foreground shadow">
			<div className="container px-4 mx-auto flex h-16 items-center justify-end">
				<a href="https://github.com/dima-gusyatiner/tikal-schwifty">
					Dima Gusyatiner
				</a>
				&nbsp; © {currentYear}
			</div>
		</footer>
	);
}
