import { ResourceBase } from './api';
import { CharacterFilter } from './character';

export interface Location extends ResourceBase {
	type: string;
	dimension: string;
	residents: string[];
}

export interface LocationFilter
	extends Pick<CharacterFilter, 'name' | 'type' | 'page'> {
	dimension?: string;
}
