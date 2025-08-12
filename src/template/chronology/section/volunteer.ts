import type { Theme } from "@renderer";
import type { Volunteer } from "@universal-resume/ts-schema";
import { DateHtmlElement } from "../component/date";
import { HighlightsHtmlElement } from "../component/highlights";
import { SectionLayout } from "../component/layout";
import { LocationHtmlElement } from "../component/location";
import { SummaryHtmlElement } from "../component/summary";
import { TagsHtmlElement } from "../component/tags";
import { TitleAndTypeHtmlElement } from "../component/title-and-type";

export function VolunteerHtmlElement(
	{
		organization,
		position,
		startDate,
		endDate,
		summary,
		highlights,
		tags,
		location,
	}: Volunteer.Type,
	theme: Theme,
	index: number,
) {
	return {
		build: () => {
			const main = `
                ${TitleAndTypeHtmlElement(
									{
										title: `<span class="text-sm"><strong>${position}</strong> at <strong>${organization.name}</strong></span>`,
										type: "volunteer",
									},
									theme.color.secondary,
								)}
                ${LocationHtmlElement(location, theme)}
                ${SummaryHtmlElement(summary)}
                ${HighlightsHtmlElement(highlights)}
                ${TagsHtmlElement(tags, theme.color.primary)}
            `;
			const sidebar = DateHtmlElement({ startDate, endDate });
			return SectionLayout("volunteer", index, theme, main, sidebar);
		},
	};
}
