export const SummaryHtmlElement = (summary: string | undefined): string => {
	if (!summary) return "";
	return `<p class="text-xs py-2">${summary}</p>`;
};
