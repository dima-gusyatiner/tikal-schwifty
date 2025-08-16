import { constants } from '@/constants';
import {
	Character,
	Info,
	CharacterFilter,
	InfoWithFilter,
	CharacterWithEpisodeCount,
} from '@/interfaces';

export async function getCharactersByIds(ids: number[]): Promise<Character[]> {
	const idsUrlSegment = JSON.stringify(ids);
	const response = await fetch(
		`${constants.apiUrl}/character/${idsUrlSegment}`,
	);
	if (!response.ok) {
		throw new Error('Failed to fetch characters');
	}
	return response.json();
}

export async function getCharactersByFilter(
	filter: CharacterFilter = {},
): Promise<InfoWithFilter<CharacterWithEpisodeCount, CharacterFilter>> {
	// Transform filter to URL parameters
	const searchParams = new URLSearchParams();
	for (const [key, value] of Object.entries(filter)) {
		if (value) {
			searchParams.append(key, value);
		}
	}

	// Build URL
	const url = `${constants.apiUrl}/character?${searchParams.toString()}`;

	// Fetch data
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch characters');
	}

	// Parse JSON response
	const responseBody: Info<Character> = await response.json();
	return {
		...responseBody,
		results: responseBody.results?.map(character => ({
			...character,
			episodeCount: character.episode.length,
		})),
		filter,
	};
}
