import type { Volunteer } from "@universal-resume/ts-schema";
import type { Theme } from "../../../../renderer";
import { HighlightsHtmlElement } from "../highlights";
import { SectionLayout } from "../layout";
import { LocationHtmlElement } from "../location";
import { SummaryHtmlElement } from "../summary";
import { TagsHtmlElement } from "../tags";
import { TitleAndDateHtmlElement } from "../title-and-date";

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
	{ color }: Theme,
	index: number,
) {
	return {
		build: () => {
			const title = `<span><strong>${organization}</strong> as <strong>${position}</strong></span>`;
			const content = `
                ${TitleAndDateHtmlElement({ title, startDate, endDate })}
                ${LocationHtmlElement(location, { color })}
                ${SummaryHtmlElement(summary)}
                ${HighlightsHtmlElement(highlights)}
                ${TagsHtmlElement(tags, { color })}
            `;
			return SectionLayout("volunteer", index, content);
		},
	};
}
