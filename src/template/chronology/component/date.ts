import type { Lang } from "../../../renderer.js";

const i18n = {
	year: {
		en: "year",
		fr: "an",
	},
	years: {
		en: "years",
		fr: "ans",
	},
	month: {
		en: "month",
		fr: "mois",
	},
	months: {
		en: "months",
		fr: "mois",
	},
} as const;

function diffInYearsAndMonths(date1: Date, date2: Date, lang: Lang) {
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
	if (years > 0)
		result += `${years} ${years > 1 ? i18n.years[lang] : i18n.year[lang]}`;
	if (years > 0 && months > 0) result += `, `;
	if (months > 0)
		result += `${months} ${months > 1 ? i18n.months[lang] : i18n.month[lang]}`;

	return result;
}

export const DateHtmlElement = (
	{
		date,
		startDate,
		endDate,
	}: {
		date?: Date | undefined;
		startDate?: Date | undefined;
		endDate?: Date | undefined;
	},
	lang: Lang,
): string => {
	if (date) {
		return `
			<span class="text-xs text-white font-bold">${date.toLocaleString(lang, { month: "short", year: "numeric" })}</span>
		`;
	}
	if (startDate && !endDate) {
		return `
		<span class="text-xs text-white font-bold">${lang === "en" ? "From" : "Depuis"} ${startDate.toLocaleString(lang, { month: "short", year: "numeric" })}</span>
		`;
	}
	if (startDate && endDate) {
		return `
			<span class="text-xs text-white font-bold">${startDate.toLocaleString(lang, { month: "short", year: "numeric" })} ➜ ${endDate.toLocaleString(lang, { month: "short", year: "numeric" })}</span>
		`;
	}
	return "";
};

export const SubDateHtmlElement = (
	{
		date,
		startDate,
		endDate,
	}: {
		date?: Date | undefined;
		startDate?: Date | undefined;
		endDate?: Date | undefined;
	},
	lang: Lang,
): string => {
	if (date) {
		return lang === "en"
			? `
			<span class="text-xs text-white ">${diffInYearsAndMonths(date, new Date(), lang)} ago</span>
		`
			: `
			<span class="text-xs text-white ">Il y a ${diffInYearsAndMonths(date, new Date(), lang)}</span>
		`;
	}
	if (startDate && !endDate) {
		return `
			<span class="text-xs text-white ">${diffInYearsAndMonths(startDate, new Date(), lang)}</span>
		`;
	}
	if (startDate && endDate) {
		return lang === "en"
			? `
			<span class="text-xs text-white ">For ${diffInYearsAndMonths(startDate, endDate, lang)}</span>
		`
			: `
			<span class="text-xs text-white ">Pendant ${diffInYearsAndMonths(startDate, endDate, lang)}</span>
		`;
	}
	return "";
};
