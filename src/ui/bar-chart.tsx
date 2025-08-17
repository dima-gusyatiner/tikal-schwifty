import { Card, CardContent } from './card';

export const COLORS = [
	'bg-red-500',
	'bg-blue-500',
	'bg-green-500',
	'bg-yellow-500',
	'bg-purple-500',
	'bg-pink-500',
	'bg-indigo-500',
	'bg-orange-500',
];

export interface BarChartProps {
	data: Record<string, number>;
	ticks?: number;
	plotHeight?: number;
	rotateLabels?: boolean;
}

export function BarChart({
	data,
	ticks = 5,
	plotHeight = 300,
	rotateLabels = true,
}: BarChartProps) {
	// Data to array of entries
	const entries = Object.entries(data);

	// Calculate max value
	const maxVal = Math.max(1, ...entries.map(([, v]) => v));
	const tickCount = Math.max(2, ticks);

	// Calculate tick values
	const tickValues = Array.from({ length: tickCount }, (_, i) =>
		Math.round((i * maxVal) / (tickCount - 1)),
	);

	// Render
	return (
		<Card>
			<CardContent>
				{/* Chart frame */}
				<div className="grid grid-cols-[auto_1fr]">
					{/* Y-axis */}
					<div style={{ height: plotHeight }}>
						<div className="flex h-full flex-col justify-between pr-1">
							{tickValues.toReversed().map((tickValue, index) => (
								<div
									key={index}
									className="h-4 flex items-center justify-end text-xs tabular-nums text-muted-foreground"
								>
									{tickValue}
								</div>
							))}
						</div>
					</div>

					{/* Plot area */}
					<div className="flex flex-col">
						{/* Grid-lines, and bars */}
						<div
							className="relative"
							style={{ height: plotHeight }}
						>
							{/* Y-axis grid-lines */}
							<div className="pointer-events-none flex h-full flex-col justify-between">
								{tickValues.map((tickValue, index) => (
									<div
										key={index}
										className="h-4 flex items-center"
									>
										<hr className="w-full m-0 border-muted-foreground/30" />
									</div>
								))}
							</div>

							{/* Bars */}
							<div className="absolute h-full w-full top-0 left-0 flex items-end gap-2 px-1 py-2">
								{entries.map(([name, value], i) => {
									const h = (value / maxVal) * 100;
									const color = COLORS[i % COLORS.length];

									return (
										<div
											key={name}
											className="h-full flex-1 min-w-[28px] flex items-end"
										>
											<div
												className={`${color} w-full`}
												style={{ height: `${Math.max(2, h)}%` }}
											/>
										</div>
									);
								})}
							</div>
						</div>

						{/* X-axis labels */}
						<div className="mt-2 flex gap-2 px-1">
							{entries.map(([name, value]) => (
								<div
									key={name}
									className="flex-1 min-w-[28px] text-center text-xs text-muted-foreground"
								>
									<span
										className={`inline-block max-w-[8rem] truncate ${
											rotateLabels ? '[writing-mode:vertical-rl]' : ''
										}`}
									>
										{name}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
