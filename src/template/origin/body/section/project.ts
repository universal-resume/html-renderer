import type { Project } from "@universal-resume/ts-schema";
import type { Theme } from "../../../../renderer";
import { HighlightsHtmlElement } from "../highlights";
import { SectionLayout } from "../layout";
import { LinkHtmlElement } from "../link";
import { LocationHtmlElement } from "../location";
import { SummaryHtmlElement } from "../summary";
import { TagsHtmlElement } from "../tags";
import { TitleAndDateHtmlElement } from "../title-and-date";

export function ProjectHtmlElement(
	{
		description,
		endDate,
		highlights,
		location,
		name,
		roles,
		startDate,
		tags,
		url,
	}: Project.Type,
	{ color }: Theme,
	index: number,
) {
	return {
		build: () => {
			const title = `<span>${roles ? `${roles.map((role) => `<strong>${role}</strong>`).join(", ")} for ` : ""} ${name ? `<strong>${name}</strong>` : ""}</span>`;
			const content = `
                ${TitleAndDateHtmlElement({ title, startDate, endDate })}
                ${LocationHtmlElement(location, { color })}
                ${LinkHtmlElement(url, { color })}
                ${SummaryHtmlElement(description)}
                ${HighlightsHtmlElement(highlights)}
                ${TagsHtmlElement(tags, { color })}
            `;
			return SectionLayout("project", index, content);
		},
	};
}
