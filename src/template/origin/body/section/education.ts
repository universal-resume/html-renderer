import type { Theme } from "@renderer";
import type { Education } from "@universal-resume/ts-schema";
import { SectionLayout } from "../layout";
import { LinkHtmlElement } from "../link";
import { LocationHtmlElement } from "../location";
import { TitleAndDateHtmlElement } from "../title-and-date";

export const Courses = (
	courses: Education.Type["courses"] | undefined,
): string => {
	if (!courses || courses.length === 0) return "";
	return `<ul class="list-disc list-inside text-xs">${courses.map((course) => `<li><strong>${course.name}</strong> ${course.description ? `<br />${course.description}` : ""}</li>`).join("")}</ul>`;
};

export function EducationHtmlElement(
	{
		institution,
		area,
		courses,
		studyType,
		startDate,
		endDate,
		url,
		location,
	}: Education.Type,
	{ color }: Theme,
	index: number,
) {
	return {
		build: () => {
			const title = `<span><strong>${studyType}</strong> in <strong>${area}</strong></span>`;
			const content = `
                ${TitleAndDateHtmlElement({ title, startDate, endDate })}
                <div class="flex gap-1">
                    <span class="text-sm font-semibold">${institution}</span>
                    ${LinkHtmlElement(url, { color })}
                </div>
                ${LocationHtmlElement(location, { color })}
                ${Courses(courses)}
            `;
			return SectionLayout("education", index, content);
		},
	};
}
