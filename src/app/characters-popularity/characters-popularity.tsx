import { useEpisodeCountByCharacterNames } from '@/hooks';
import { BarChart, Card, Loading } from '@/ui';

export interface CharactersPopularityProps {
	characterNames: string[];
}

export function CharactersPopularity({
	characterNames,
}: CharactersPopularityProps) {
	// Fetch episode count by character names
	const { isFetching, episodeCountByCharacterName } =
		useEpisodeCountByCharacterNames(characterNames);

	// Is Fetching?
	if (isFetching) {
		return <Loading />;
	}

	// No episode count found
	if (!episodeCountByCharacterName) {
		return <Card>No episode count found</Card>;
	}

	// Render
	return (
		<div className="grid grid-cols-12 justify-center">
			<div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-4">
				<BarChart data={episodeCountByCharacterName} />
			</div>
		</div>
	);
}
