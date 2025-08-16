import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function CharactersPopularityPage() {
	return (
		<div>
			<Link
				href="/"
				className="inline-flex items-center mb-4"
			>
				<ArrowLeftIcon className="mr-1" />
				Home
			</Link>

			<h1 className="text-3xl font-bold">Characters Popularity</h1>
			<p>This page will show the popularity of characters in a chart format.</p>
		</div>
	);
}
