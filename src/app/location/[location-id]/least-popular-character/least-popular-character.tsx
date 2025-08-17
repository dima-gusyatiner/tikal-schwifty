'use client';

import { useMemo } from 'react';

import { getIdFromResource } from '@/api';
import { useCharactersByIds, useLeastPopularCharacter } from '@/hooks';
import { Location } from '@/interfaces';
import { Card, Loading } from '@/ui';

import { CharacterCard } from './character-card';

export interface LeastPopularCharacterProps {
	location: Location;
}

export function LeastPopularCharacter({
	location,
}: LeastPopularCharacterProps) {
	// Get character IDs from location residents
	const characterIds = useMemo(
		() =>
			location.residents.map(characterUrl => getIdFromResource(characterUrl)),
		[location.residents],
	);

	// Fetch character data and find the least popular character
	const { data: characters, isFetching } = useCharactersByIds(characterIds);
	const character = useLeastPopularCharacter(characters);

	// Loading
	if (isFetching) {
		return <Loading message="Fetching least popular character..." />;
	}

	// No character found
	if (!character) {
		return <Card>No character found</Card>;
	}

	// Render
	return (
		<div className="grid grid-cols-12 justify-center">
			<p className="col-span-12 mb-4">
				From the information we could gather, the least popular character is
				that was <u>last seen</u> on <strong> {location.name}</strong> is:
			</p>
			<div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-4">
				<CharacterCard character={character} />
			</div>
		</div>
	);
}
