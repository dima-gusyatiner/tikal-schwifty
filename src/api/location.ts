import { constants } from '@/constants';
import { Location } from '@/interfaces';

export async function getLocationById(id: number): Promise<Location> {
	const response = await fetch(`${constants.apiUrl}/location/${id}`);
	if (!response.ok) {
		throw new Error('Failed to fetch location');
	}
	return response.json();
}
