import { Theme } from "../../../renderer";

export const Summary = (
	summary: string | undefined,
	{ color }: Theme,
): string => {
	if (!summary) return "";
	return `<p class="text-xs">${summary}</p>`;
};
