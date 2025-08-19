import type { Employment } from "@universal-resume/ts-schema";
import type { Theme } from "../../../renderer.js";
import { DateHtmlElement, SubDateHtmlElement } from "../component/date.js";
import { HighlightsHtmlElement } from "../component/highlights.js";
import { SectionLayout } from "../component/layout.js";
import { LinkHtmlElement } from "../component/link.js";
import { LocationHtmlElement } from "../component/location.js";
import { SummaryHtmlElement } from "../component/summary.js";
import { TagsHtmlElement } from "../component/tags.js";
import { TitleHtmlElement } from "../component/title.js";
import { TypeHtmlElement } from "../component/type.js";

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
