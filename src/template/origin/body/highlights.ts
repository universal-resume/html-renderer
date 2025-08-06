import { Theme } from "../../../..";

export const Highlights = (
	highlights: readonly string[] | undefined,
	{ color }: Theme,
): string => {
	if (!highlights || highlights.length === 0) return "";
	return `<ul class="list-disc list-inside text-xs font-semibold">${highlights.map((highlight) => `<li>${highlight}</li>`).join("")}</ul>`;
};
