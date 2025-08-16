'use client';

import { getIdFromResource } from '@/api';
import { useCharactersByIds, useLeastPopularCharacter } from '@/hooks';
import { Location } from '@/interfaces';
import { useMemo } from 'react';

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

	// Debug
	const loadingMessage = isFetching ? 'Loading...' : 'Done!';
	console.log({ isFetching, character, characters });

	// Render
	return (
		<>
			<p>
				This page will show the least popular character for the selected
				location (at {location.name}).
			</p>
			<p>{loadingMessage}</p>
		</>
	);
}
