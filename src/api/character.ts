import { constants } from '@/constants';
import { Character, Info } from '@/interfaces';

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
