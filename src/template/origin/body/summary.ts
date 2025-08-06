export const SummaryHtmlElement = (summary: string | undefined): string => {
	if (!summary) return "";
	return `<p class="text-xs">${summary}</p>`;
};
