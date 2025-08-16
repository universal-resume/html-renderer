import type { Award } from "@universal-resume/ts-schema";
import type { Theme } from "../../../renderer.js";
import { DateHtmlElement, SubDateHtmlElement } from "../component/date.js";
import { SectionLayout } from "../component/layout.js";
import { LocationHtmlElement } from "../component/location.js";
import { SummaryHtmlElement } from "../component/summary.js";
import { TagsHtmlElement } from "../component/tags.js";
import { TitleHtmlElement } from "../component/title.js";
import { TypeHtmlElement } from "../component/type.js";

export function AwardHtmlElement(
	{ issuer, date, summary, location, tags, title }: Award.Type,
	theme: Theme,
	index: number,
) {
	return {
		build: () => {
			const main = `
                ${TitleHtmlElement({
									title: `<span class="text-sm"><strong>${title}</strong> from <strong>${issuer.name}</strong></span>`,
								})}
                ${LocationHtmlElement(location, theme)}
                ${SummaryHtmlElement(summary)}
                ${TagsHtmlElement(tags, theme.color.primary)}
            `;
			const sidebar = `${DateHtmlElement({ date })} ${TypeHtmlElement({ type: "award" }, theme.color.secondary)} ${SubDateHtmlElement({ date })}`;
			return SectionLayout("award", index, theme, main, sidebar);
		},
	};
}
