export const TagsHtmlElement = (
	tags: readonly string[] | undefined,
	color: string,
): string => {
	if (!tags || tags.length === 0) return "";
	return `<div>${tags.map((tag) => `<span class="mr-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-1.5 py-0.5 bg-${color}-200 text-${color}-700 rounded-full">${tag}</span>`).join("")}</div>`;
};
