'use client';

import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { CharactersPopularity } from './characters-popularity';

/**
 * List of character names hardcoded
 * @todo Replace with dynamic user-input
 */
export const characterNames = [
	'Abradolf Lincler',
	'Arcade Alien',
	'Morty Smith',
	'Birdperson',
	'Mr. Meeseeks',
];

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
			<p className="mb-4">
				This page will show the popularity of characters in a bar-chart format.
			</p>

			<CharactersPopularity characterNames={characterNames} />
		</div>
	);
}
