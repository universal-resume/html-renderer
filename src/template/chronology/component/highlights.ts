export const HighlightsHtmlElement = (
	highlights: readonly string[] | undefined,
): string => {
	if (!highlights || highlights.length === 0) return "";
	return `<ul class="list-disc list-inside text-xs font-semibold py-2">${highlights.map((highlight) => `<li>${highlight}</li>`).join("")}</ul>`;
};
