import { useMemo } from 'react';
import { useCharactersByFilters } from './use-characters-by-filters';

export type EpisodeCountByCharacterNames = {
	[characterName: string]: number;
};

export type EpisodeCountByCharacterNamesResponse = {
	episodeCountByCharacterName: EpisodeCountByCharacterNames | undefined;
	isFetching: boolean;
};

export function useEpisodeCountByCharacterNames(
	characterNames: string[],
): EpisodeCountByCharacterNamesResponse {
	const { data: charactersByFilterMap, isFetching } = useCharactersByFilters(
		characterNames.map(name => ({ name })),
	);

	const episodeCountByCharacterName = useMemo(() => {
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

	return { episodeCountByCharacterName, isFetching };
}
