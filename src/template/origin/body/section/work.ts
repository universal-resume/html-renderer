import type { Work } from "@universal-resume/ts-schema";
import type { Theme } from "../../../../renderer";
import { HighlightsHtmlElement } from "../highlights";
import { SectionLayout } from "../layout";
import { LinkHtmlElement } from "../link";
import { LocationHtmlElement } from "../location";
import { SummaryHtmlElement } from "../summary";
import { TagsHtmlElement } from "../tags";
import { TitleAndDateHtmlElement } from "../title-and-date";

export function WorkHtmlElement(
	{
		position,
		organization,
		location,
		startDate,
		endDate,
		description,
		highlights,
		url,
		tags,
	}: Work.Type,
	{ color }: Theme,
	index: number,
) {
	return {
		build: () => {
			const title = `<span><strong>${position}</strong> at <strong>${organization}</strong></span>`;
			const content = `
                ${TitleAndDateHtmlElement({ title, startDate, endDate })}
                ${LocationHtmlElement(location, { color })}
                ${LinkHtmlElement(url, { color })}
                ${SummaryHtmlElement(description)}
                ${HighlightsHtmlElement(highlights)}
                ${TagsHtmlElement(tags, { color })}
            `;
			return SectionLayout("work", index, content);
		},
	};
}
