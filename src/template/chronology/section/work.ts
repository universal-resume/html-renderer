import type { Theme } from "@renderer";
import type { Work } from "@universal-resume/ts-schema";

import { DateHtmlElement } from "../component/date";
import { HighlightsHtmlElement } from "../component/highlights";
import { SectionLayout } from "../component/layout";
import { LinkHtmlElement } from "../component/link";
import { LocationHtmlElement } from "../component/location";
import { SummaryHtmlElement } from "../component/summary";
import { TagsHtmlElement } from "../component/tags";
import { TitleAndTypeHtmlElement } from "../component/title-and-type";

export function WorkHtmlElement(
	{
		position,
		organization,
		location,
		startDate,
		endDate,
		summary,
		highlights,
		url,
		tags,
	}: Work.Type,
	theme: Theme,
	index: number,
) {
	return {
		build: () => {
			const main = `
                ${TitleAndTypeHtmlElement(
									{
										title: `<span class="text-sm"><strong>${position}</strong> at <strong>${organization.name}</strong></span>`,
										type: "work",
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
			return SectionLayout("work", index, theme, main, sidebar);
		},
	};
}
