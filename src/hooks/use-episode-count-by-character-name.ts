import { useMemo } from 'react';
import { useCharactersByFilters } from './use-characters-by-filters';

export type EpisodeCountByCharacterNames = {
	[name: string]: number;
};

export function useEpisodeCountByCharacterNames(
	characterNames: string[],
): EpisodeCountByCharacterNames | undefined {
	const { data: charactersByFilterMap } = useCharactersByFilters(
		characterNames.map(name => ({ name })),
	);

	return useMemo(() => {
		if (!charactersByFilterMap) {
			return undefined;
		}

		const episodeCountByCharacterName: EpisodeCountByCharacterNames = {};
		for (const [filter, characters] of charactersByFilterMap.entries()) {
			if (!filter.name) {
				throw new Error(
					`Filter name is required, but got: ${JSON.stringify(filter)}`,
				);
			}

			const keyExists = filter.name in episodeCountByCharacterName;
			if (!keyExists) {
				episodeCountByCharacterName[filter.name] = 0;
			}

			for (const character of characters) {
				episodeCountByCharacterName[filter.name] += character.episodeCount;
			}
		}
		return episodeCountByCharacterName;
	}, [charactersByFilterMap]);
}
