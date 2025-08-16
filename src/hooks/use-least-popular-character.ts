import { Character, CharacterWithEpisodeCount } from '@/interfaces';
import { useMemo } from 'react';

/**
 * Hook to find the least popular character from a list of characters.
 * @param characters Array of characters.
 * @returns The least popular character or undefined if no characters are provided.
 */
export function useLeastPopularCharacter(characters?: Character[]) {
	return useMemo(() => {
		// If no characters are provided, return undefined
		if (!characters?.length) {
			return undefined;
		}

		// Prepare variables
		let minimumEpisodes = Infinity;
		let leastPopularCharacter: CharacterWithEpisodeCount | undefined;

		// Loop through characters
		for (const character of characters) {
			const episodeCount = character.episode?.length ?? 0;

			// If the current character has fewer episodes than the minimum found so far,
			if (episodeCount < minimumEpisodes) {
				minimumEpisodes = episodeCount;
				leastPopularCharacter = {
					...character,
					episodeCount,
				};
				continue;
			}

			// If the current character has the same number of episodes as the minimum found so far,
			// choose the one that would appear last if sorted A→Z
			if (episodeCount === minimumEpisodes && leastPopularCharacter) {
				if (
					character.name.localeCompare(leastPopularCharacter.name, 'en') > 0
				) {
					leastPopularCharacter = {
						...character,
						episodeCount,
					};
				}
			}
		}

		// Return result
		return leastPopularCharacter;
	}, [characters]);
}
