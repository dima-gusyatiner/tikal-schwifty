import { getCharactersByFilter } from '@/api';
import {
	CharacterFilter,
	CharacterWithEpisodeCount,
	InfoWithFilter,
} from '@/interfaces';
import {
	QueryObserverResult,
	useQueries,
	UseQueryResult,
} from '@tanstack/react-query';

export type CharactersByFilterMap = Map<
	CharacterFilter,
	CharacterWithEpisodeCount[]
>;

export type CharactersByFiltersQueryResult = Pick<
	UseQueryResult<CharactersByFilterMap>,
	'isFetching' | 'data'
>;

/**
 * Custom hook to fetch characters by their filters.
 * @param filters Array of character filters to apply.
 * @returns An object containing the fetching state and the filtered characters.
 * @todo This only gets the first page of results.
 */
export function useCharactersByFilters(
	filters: CharacterFilter[],
): CharactersByFiltersQueryResult {
	return useQueries({
		queries: filters.map(filter => ({
			queryKey: ['characters', filter],
			queryFn: () => getCharactersByFilter(filter),
		})),
		combine: results => combineCharactersByFiltersQueries(results),
	});
}

export function combineCharactersByFiltersQueries(
	results: QueryObserverResult<
		InfoWithFilter<CharacterWithEpisodeCount, CharacterFilter>,
		Error
	>[],
): CharactersByFiltersQueryResult {
	return {
		isFetching: results.some(result => result.isFetching),
		data: results.reduce((combined, result) => {
			if (result.data?.results) {
				combined.set(result.data.filter, result.data.results);
			}
			return combined;
		}, new Map<CharacterFilter, CharacterWithEpisodeCount[]>()),
	};
}
