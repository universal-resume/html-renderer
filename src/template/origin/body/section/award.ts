import type { Theme } from "@renderer";
import type { Award } from "@universal-resume/ts-schema";
import { SectionLayout } from "../layout";
import { LocationHtmlElement } from "../location";
import { SummaryHtmlElement } from "../summary";
import { TagsHtmlElement } from "../tags";
import { TitleAndDateHtmlElement } from "../title-and-date";

export function AwardHtmlElement(
	{ awarder, date, summary, location, tags, title }: Award.Type,
	{ color }: Theme,
	index: number,
) {
	return {
		build: () => {
			const content = `
                ${TitleAndDateHtmlElement({ title: `<span><strong>${title}</strong> from <strong>${awarder}</strong></span>`, date })}
                ${LocationHtmlElement(location, { color })}
                ${SummaryHtmlElement(summary)}
                ${TagsHtmlElement(tags, { color })}
            `;
			return SectionLayout("award", index, content);
		},
	};
}
