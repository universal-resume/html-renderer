function diffInYearsAndMonths(date1: Date, date2: Date) {
	// Ensure date1 is earlier
	if (date1 > date2) [date1, date2] = [date2, date1];

	let years = date2.getFullYear() - date1.getFullYear();
	let months = date2.getMonth() - date1.getMonth();

	// Adjust if months is negative
	if (months < 0) {
		years--;
		months += 12;
	}

	let result = "";
	if (years > 0) result += `${years} year${years > 1 ? "s" : ""}`;
	if (years > 0 && months > 0) result += `, `;
	if (months > 0) result += `${months} month${months > 1 ? "s" : ""}`;

	return result;
}

export const DateHtmlElement = ({
	date,
	startDate,
	endDate,
}: {
	date?: Date | undefined;
	startDate?: Date | undefined;
	endDate?: Date | undefined;
}): string => {
	if (date) {
		return `
			<span class="text-xs text-white font-bold">${date.toLocaleString("en-US", { month: "short", year: "numeric" })}</span>
			<span class="text-xs text-white ">${diffInYearsAndMonths(date, new Date())} ago</span>
		`;
	}
	if (startDate && !endDate) {
		return `
		<span class="text-xs text-white font-bold">Until ${startDate.toLocaleString("en-US", { month: "short", year: "numeric" })}</span>
			<span class="text-xs text-white ">${diffInYearsAndMonths(startDate, new Date())}</span>
		`;
	}
	if (startDate && endDate) {
		return `
			<span class="text-xs text-white font-bold">${startDate.toLocaleString("en-US", { month: "short", year: "numeric" })} ➜ ${endDate.toLocaleString("en-US", { month: "short", year: "numeric" })}</span>
			<span class="text-xs text-white ">For ${diffInYearsAndMonths(startDate, endDate)}</span>
		`;
	}
	return "";
};
