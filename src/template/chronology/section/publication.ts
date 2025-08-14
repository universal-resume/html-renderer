import type { Theme } from "@renderer";
import type { Publication } from "@universal-resume/ts-schema";
import { DateHtmlElement, SubDateHtmlElement } from "../component/date";
import { SectionLayout } from "../component/layout";
import { LinkHtmlElement } from "../component/link";
import { SummaryHtmlElement } from "../component/summary";
import { TagsHtmlElement } from "../component/tags";
import { TitleHtmlElement } from "../component/title";
import { TypeHtmlElement } from "../component/type";

export function PublicationHtmlElement(
	{ name, publisher, date, summary, url, tags }: Publication.Type,
	theme: Theme,
	index: number,
) {
	return {
		build: () => {
			const main = `
                ${TitleHtmlElement({
									title: `<span class="text-sm"><strong>${name}</strong></span>`,
								})}
				${publisher ? `<div class="text-xs italic text-center">Published at ${publisher.name}</div>` : ""}
                ${LinkHtmlElement(url, theme)}
                ${SummaryHtmlElement(summary)}
                ${TagsHtmlElement(tags, theme.color.primary)}
            `;
			const sidebar = `${DateHtmlElement({ date })} ${TypeHtmlElement({ type: "publication" }, theme.color.secondary)} ${SubDateHtmlElement({ date })}`;
			return SectionLayout("publication", index, theme, main, sidebar);
		},
	};
}
