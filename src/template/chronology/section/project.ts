import type { Theme } from "@renderer";
import type { Project } from "@universal-resume/ts-schema";
import { DateHtmlElement } from "../component/date";
import { HighlightsHtmlElement } from "../component/highlights";
import { SectionLayout } from "../component/layout";
import { LinkHtmlElement } from "../component/link";
import { LocationHtmlElement } from "../component/location";
import { SummaryHtmlElement } from "../component/summary";
import { TagsHtmlElement } from "../component/tags";
import { TitleAndTypeHtmlElement } from "../component/title-and-type";

export function ProjectHtmlElement(
	{
		summary,
		endDate,
		highlights,
		location,
		name,
		position,
		startDate,
		tags,
		url,
	}: Project.Type,
	theme: Theme,
	index: number,
) {
	return {
		build: () => {
			const main = `
                ${TitleAndTypeHtmlElement(
									{
										title: `<span class="text-sm"><strong>${position}</strong> at <strong>${name}</strong></span>`,
										type: "project",
									},
									theme.color.secondary,
								)}
                ${LocationHtmlElement(location, theme)}
                ${LinkHtmlElement(url, theme)}
                ${SummaryHtmlElement(summary)}
                ${HighlightsHtmlElement(highlights)}
                ${TagsHtmlElement(tags, theme.color.primary)}
            `;
			const sidebar = DateHtmlElement({ startDate, endDate });
			return SectionLayout("project", index, theme, main, sidebar);
		},
	};
}
