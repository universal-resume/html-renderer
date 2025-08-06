export const DateHtmlElement = ({
	date,
	startDate,
	endDate,
}: {
	date?: string | undefined;
	startDate?: string | undefined;
	endDate?: string | undefined;
}): string => {
	if (date) return `<span class="text-xs text-gray-400">${date}</span>`;
	if (startDate && !endDate)
		return `<span class="text-xs text-gray-400">Until ${startDate}</span>`;
	if (startDate && endDate)
		return `<span class="text-xs text-gray-400">${startDate} ➜ ${endDate}</span>`;
	return "";
};
