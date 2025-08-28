import type { Education } from "@universal-resume/ts-schema";
import type { Lang, Theme } from "../../../renderer.js";
import { DateHtmlElement, SubDateHtmlElement } from "../component/date.js";
import { SectionLayout } from "../component/layout.js";
import { LinkHtmlElement } from "../component/link.js";
import { LocationHtmlElement } from "../component/location.js";
import { TitleHtmlElement } from "../component/title.js";
import { TypeHtmlElement } from "../component/type.js";

export const Courses = (
	courses: Education.Type["courses"] | undefined,
): string => {
	if (!courses || courses.length === 0) return "";
	return `<ul class="list-disc list-inside text-xs py-2">${courses.map((course) => `<li><strong>${course.name}</strong> ${course.summary ? `<br/> ${course.summary}` : ""}</li>`).join("")}</ul>`;
};

const i18n = {
	en: {
		in: "in",
	},
	fr: {
		in: "en",
	},
} as const;

export function EducationHtmlElement(
	{
		organization,
		area,
		courses,
		type,
		startDate,
		endDate,
		url,
		location,
	}: Education.Type,
	theme: Theme,
	lang: Lang,
	path: string,
) {
	return {
		build: () => {
			const main = `
				${TitleHtmlElement({
					title: `<span class="text-sm"><strong>${type}</strong> ${i18n[lang].in} <strong>${area}</strong></span>`,
				})}
                <div class="flex gap-1">
                    <span class="text-sm font-semibold">${organization.name}</span>
                    ${LinkHtmlElement(url, theme)}
                </div>
                ${LocationHtmlElement(location, theme)}
                ${Courses(courses)}
            `;
			const sidebar = `${DateHtmlElement({ startDate, endDate }, lang)} ${TypeHtmlElement({ type: "education" }, lang, theme.color.secondary)} ${SubDateHtmlElement({ startDate, endDate }, lang)}`;
			return SectionLayout("education", path, theme, main, sidebar);
		},
	};
}
