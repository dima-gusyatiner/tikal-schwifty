import Image from 'next/image';
import { CharacterWithEpisodeCount } from '@/interfaces';
import { Card, CardContent } from '@/ui';
import {
	ChartColumnIcon,
	CircleQuestionMarkIcon,
	EarthIcon,
	PawPrintIcon,
	VenusAndMarsIcon,
} from 'lucide-react';

export interface CharacterCardProps {
	character: CharacterWithEpisodeCount;
}

export const statusColor: Record<string, string> = {
	Alive: 'bg-emerald-500',
	Dead: 'bg-rose-500',
	unknown: 'bg-slate-400',
};

export function CharacterCard({ character }: CharacterCardProps) {
	const statusClass = statusColor[character.status];

	return (
		<Card className="p-0 overflow-hidden">
			<CardContent className="p-0 grid grid-cols-12">
				{/* Image */}
				<div className="col-span-12 md:col-span-4">
					<div className="relative aspect-square md:aspect-auto md:h-full">
						<Image
							src={character.image}
							alt={character.name}
							fill
							className="object-cover"
						/>
					</div>
				</div>

				{/* Details */}
				<div className="p-2 sm:p-4 col-span-12 md:col-span-8">
					{/* Name */}
					<h2 className="text-xl underline font-bold mb-1">{character.name}</h2>
					<dl className="grid [grid-template-columns:max-content_1fr] gap-x-1 gap-y-1 items-center">
						{/* Origin */}
						<dt className="text-sm text-muted-foreground flex items-center">
							<EarthIcon className="mr-1 h-4 w-4" />
							Origin:
						</dt>
						<dd>{character.origin.name}</dd>

						{/* Status */}
						<dt className="text-sm text-muted-foreground flex items-center">
							<CircleQuestionMarkIcon className="mr-1 h-4 w-4" />
							Status:
						</dt>
						<dd>
							<span
								className={`mr-1 inline-block h-2.5 w-2.5 rounded-full ${statusClass}`}
								aria-hidden
							/>
							{character.status}
						</dd>

						{/* Species */}
						<dt className="text-sm text-muted-foreground flex items-center">
							<PawPrintIcon className="mr-1 h-4 w-4" />
							Species:
						</dt>
						<dd>{character.species}</dd>

						{/* Gender */}
						<dt className="text-sm text-muted-foreground flex items-center">
							<VenusAndMarsIcon className="mr-1 inline-block h-4 w-4" />
							Gender:
						</dt>
						<dd>{character.gender}</dd>

						{/* Number of Episodes */}
						<dt className="text-sm text-muted-foreground flex items-center">
							<ChartColumnIcon className="mr-1 h-4 w-4" />
							Popularity:
						</dt>
						<dd>
							{character.episodeCount}{' '}
							{character.episodeCount > 1 ? 'episodes' : 'episode'}
						</dd>
					</dl>
				</div>
			</CardContent>
		</Card>
	);
}
