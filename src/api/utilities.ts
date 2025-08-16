export function getIdFromResource(url: string): number {
	const parts = url.split('/');
	const id = parts.pop();
	return Number(id);
}

export function separateIdsToChunks(
	ids: number[],
	chunkSize: number,
): number[][] {
	const idChunks: number[][] = [];
	for (let i = 0; i < ids.length; i += chunkSize) {
		idChunks.push(ids.slice(i, i + chunkSize));
	}
	return idChunks;
}
