import type { Theme } from "@renderer";
import type { Employment } from "@universal-resume/ts-schema";

import { DateHtmlElement, SubDateHtmlElement } from "../component/date";
import { HighlightsHtmlElement } from "../component/highlights";
import { SectionLayout } from "../component/layout";
import { LinkHtmlElement } from "../component/link";
import { LocationHtmlElement } from "../component/location";
import { SummaryHtmlElement } from "../component/summary";
import { TagsHtmlElement } from "../component/tags";
import { TitleHtmlElement } from "../component/title";
import { TypeHtmlElement } from "../component/type";

export function EmploymentHtmlElement(
	{
		position,
		organization,
		location,
		startDate,
		endDate,
		summary,
		highlights,
		url,
		type,
		tags,
	}: Employment.Type,
	theme: Theme,
	index: number,
) {
	return {
		build: () => {
			const main = `
                ${TitleHtmlElement({
									title: `<span class="text-sm"><strong>${position}</strong> at <strong>${organization.name}</strong></span>`,
								})}
                ${LocationHtmlElement(location, theme)}
                ${LinkHtmlElement(url, theme)}
                ${SummaryHtmlElement(summary)}
                ${HighlightsHtmlElement(highlights)}
                ${TagsHtmlElement(tags, theme.color.primary)}
            `;
			const sidebar = `${DateHtmlElement({ startDate, endDate })} ${TypeHtmlElement({ type: "employment" }, theme.color.secondary)} ${TypeHtmlElement({ type }, theme.color.primary)} ${SubDateHtmlElement({ startDate, endDate })}`;
			return SectionLayout("work", index, theme, main, sidebar);
		},
	};
}

// ${(references || []).map((reference) => ReferenceHtmlElement({...reference, organization: organization})).join("")}
