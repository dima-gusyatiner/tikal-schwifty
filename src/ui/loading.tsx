import { Loader2Icon } from 'lucide-react';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './card';

export interface LoadingProps {
	message?: string;
}

export function Loading({ message }: LoadingProps) {
	if (!message) {
		message = 'Loading...';
	}

	return (
		<Card>
			<CardContent className="flex items-center text-2xl text-muted-foreground">
				<Loader2Icon className="h-8 w-8 animate-spin mr-1" />
				<span>{message}</span>
			</CardContent>
		</Card>
	);
}
