import { GhostIcon, ChartColumnIcon, EarthIcon } from 'lucide-react';
import { Button } from '@/ui';
import Link from 'next/link';

export default function Home() {
	return (
		<div>
			<h1 className="text-3xl font-bold">Welcome!</h1>
			<div className="mt-4 flex gap-4 flex-col sm:flex-row">
				<div className="flex-1 text-center">
					<Button
						asChild
						className="w-full"
					>
						<Link href="/location/1/least-popular-character">
							<GhostIcon />
							Least Popular Character on Earth (C-137)
						</Link>
					</Button>
				</div>
				<div className="flex-1 text-center">
					<Button
						asChild
						className="w-full"
					>
						<Link href="/characters-popularity">
							<ChartColumnIcon />
							Characters Popularity
						</Link>
					</Button>
				</div>
				{/* <div className="flex-1 text-center">
					<Button
						asChild
						className="w-full"
					>
						<Link href="/location">
							<EarthIcon />
							Locations
						</Link>
					</Button>
				</div> */}
			</div>
		</div>
	);
}
