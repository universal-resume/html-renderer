import type { Publication } from "@universal-resume/ts-schema";
import type { Theme } from "../../../renderer.js";
import { DateHtmlElement, SubDateHtmlElement } from "../component/date.js";
import { SectionLayout } from "../component/layout.js";
import { LinkHtmlElement } from "../component/link.js";
import { SummaryHtmlElement } from "../component/summary.js";
import { TagsHtmlElement } from "../component/tags.js";
import { TitleHtmlElement } from "../component/title.js";
import { TypeHtmlElement } from "../component/type.js";

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
