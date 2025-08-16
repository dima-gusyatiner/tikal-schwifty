import { Character } from '@/interfaces';
import { constants } from '@/constants';
import {
	QueryObserverResult,
	useQueries,
	UseQueryResult,
} from '@tanstack/react-query';
import { useMemo } from 'react';
import { getCharactersByIds, separateIdsToChunks } from '@/api';

export type CharactersByIdQueryResult = Pick<
	UseQueryResult<Character[]>,
	| 'isPending'
	| 'isLoading'
	| 'isLoadingError'
	| 'isFetching'
	| 'isError'
	| 'isSuccess'
	| 'error'
	| 'data'
	| 'isFetched'
>;

/**
 * Hook to fetch characters by their IDs.
 * Will separate the IDs into chunks, to support pagination.
 * @param ids Array of character IDs.
 * @returns Query result for the character data.
 */
export function useCharactersByIds(ids: number[]): CharactersByIdQueryResult {
	const idChunks = useMemo(
		() => separateIdsToChunks(ids, constants.perPage),
		[ids],
	);

	const response = useQueries({
		queries: idChunks.map(idChunk => ({
			queryKey: ['characters', idChunk],
			queryFn: () => getCharactersByIds(idChunk),
		})),
		combine: combineCharactersByIdsQueries,
	});

	return response;
}

/**
 * Combines multiple character query results into a single result.
 * @param results Array of character query results.
 * @returns Combined character query result.
 */
export function combineCharactersByIdsQueries(
	results: QueryObserverResult<Character[], Error>[],
): CharactersByIdQueryResult {
	// Status Booleans
	const isPending = results.some(r => r.isPending);
	const isLoading = results.some(r => r.isLoading);
	const isLoadingError = results.some(r => r.isLoadingError);
	const isFetching = results.some(r => r.isFetching);
	const isError = results.some(r => r.isError);
	const isSuccess = results.every(r => r.isSuccess);
	const error = results.find(r => r.isError)?.error ?? null;
	const isFetched = results.every(r => r.isFetched);

	// Combine results
	const data = results.flatMap(result => result.data ?? []);

	// Return combined result
	return {
		isPending,
		isLoading,
		isFetching,
		isError,
		isSuccess,
		error,
		isLoadingError,
		data,
		isFetched,
	};
}
