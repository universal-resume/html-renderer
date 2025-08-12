import type { Theme } from "@renderer";
import type { Publication } from "@universal-resume/ts-schema";
import { DateHtmlElement } from "../component/date";
import { SectionLayout } from "../component/layout";
import { LinkHtmlElement } from "../component/link";
import { SummaryHtmlElement } from "../component/summary";
import { TagsHtmlElement } from "../component/tags";
import { TitleAndTypeHtmlElement } from "../component/title-and-type";

export function PublicationHtmlElement(
	{ name, publisher, date, summary, url, tags }: Publication.Type,
	theme: Theme,
	index: number,
) {
	return {
		build: () => {
			const main = `
                ${TitleAndTypeHtmlElement(
									{
										title: `<span class="text-sm"><strong>${name}</strong></span>`,
										type: "publication",
									},
									theme.color.secondary,
								)}
				${publisher ? `<div class="text-xs italic">Published at ${publisher.name}</div>` : ""}
                ${LinkHtmlElement(url, theme)}
                ${SummaryHtmlElement(summary)}
                ${TagsHtmlElement(tags, theme.color.primary)}
            `;
			const sidebar = DateHtmlElement({ date });
			return SectionLayout("publication", index, theme, main, sidebar);
		},
	};
}
