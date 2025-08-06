import { Education } from "@universal-resume/ts-schema";
import { Theme } from "../../../../renderer";
import { TitleAndDate } from "../title-and-date";
import { Location } from "../location";
import { Link } from "../link";
import { Layout } from "../layout";

export const Courses = (
	courses: Education.Type["courses"] | undefined,
	{ color }: Theme,
): string => {
	if (!courses || courses.length === 0) return "";
	return `<ul class="list-disc list-inside text-xs">${courses.map((course) => `<li><strong>${course.name}</strong> ${course.description ? `<br />${course.description}` : ""}</li>`).join("")}</ul>`;
};

export function EducationRenderer(
	{
		institution,
		area,
		courses,
		studyType,
		startDate,
		endDate,
		url,
		location,
		score,
	}: Education.Type,
	{ color }: Theme,
	index: number,
) {
	return {
		build: () => {
			const title = `<span><strong>${studyType}</strong> in <strong>${area}</strong></span>`;
			const content = `
                ${TitleAndDate({ title, startDate, endDate }, { color })}
                <div class="flex gap-1">
                    <span class="text-sm font-semibold">${institution}</span>
                    ${Link(url, { color })}
                </div>
                ${Location(location, { color })}
                ${Courses(courses, { color })}
            `;
			return Layout("education", index, content);
		},
	};
}
