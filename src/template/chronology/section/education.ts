import type { Theme } from "@renderer";
import type { Education } from "@universal-resume/ts-schema";
import { DateHtmlElement } from "../component/date";
import { SectionLayout } from "../component/layout";
import { LinkHtmlElement } from "../component/link";
import { LocationHtmlElement } from "../component/location";
import { TitleAndTypeHtmlElement } from "../component/title-and-type";

export const Courses = (
	courses: Education.Type["courses"] | undefined,
): string => {
	if (!courses || courses.length === 0) return "";
	return `<ul class="list-disc list-inside text-xs py-2">${courses.map((course) => `<li><strong>${course.name}</strong> ${course.summary ? `${course.summary}` : ""}</li>`).join("")}</ul>`;
};

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
	index: number,
) {
	return {
		build: () => {
			const main = `
				${TitleAndTypeHtmlElement(
					{
						title: `<span class="text-sm"><strong>${type}</strong> in <strong>${area}</strong></span>`,
						type: "education",
					},
					theme.color.secondary,
				)}
                <div class="flex gap-1">
                    <span class="text-sm font-semibold">${organization.name}</span>
                    ${LinkHtmlElement(url, theme)}
                </div>
                ${LocationHtmlElement(location, theme)}
                ${Courses(courses)}
            `;
			const sidebar = DateHtmlElement({ startDate, endDate });
			return SectionLayout("education", index, theme, main, sidebar);
		},
	};
}
