import type { Theme } from "@renderer";
import type { Award } from "@universal-resume/ts-schema";
import { DateHtmlElement, SubDateHtmlElement } from "../component/date";
import { SectionLayout } from "../component/layout";
import { LocationHtmlElement } from "../component/location";
import { SummaryHtmlElement } from "../component/summary";
import { TagsHtmlElement } from "../component/tags";
import { TitleHtmlElement } from "../component/title";
import { TypeHtmlElement } from "../component/type";

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
