import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { LeastPopularCharacter } from './least-popular-character';
import { getLocationById } from '@/api';

export interface LeastPopularCharacterPageProps {
	params: Promise<{
		'location-id': string;
	}>;
}

export default async function LeastPopularCharacterPage({
	params,
}: LeastPopularCharacterPageProps) {
	const { ['location-id']: locationId } = await params;
	const location = await getLocationById(Number(locationId));

	return (
		<div>
			<Link
				href="/"
				className="inline-flex items-center mb-4"
			>
				<ArrowLeftIcon className="mr-1" />
				Home
			</Link>

			<h1 className="text-3xl font-bold">Least Popular Character</h1>
			<LeastPopularCharacter location={location} />
		</div>
	);
}
