import type { Theme } from "@renderer";
import type { Publication } from "@universal-resume/ts-schema";
import { SectionLayout } from "../layout";
import { LinkHtmlElement } from "../link";
import { SummaryHtmlElement } from "../summary";
import { TagsHtmlElement } from "../tags";
import { TitleAndDateHtmlElement } from "../title-and-date";

export function PublicationHtmlElement(
	{ name, publisher, releaseDate, summary, url, tags }: Publication.Type,
	{ color }: Theme,
	index: number,
) {
	return {
		build: () => {
			const title = `<span><strong>${name}</strong> ${publisher ? `by <strong>${publisher}</strong>` : ""}</span>`;
			const content = `
                ${TitleAndDateHtmlElement({ title, date: releaseDate })}
                ${LinkHtmlElement(url, { color })}
                ${SummaryHtmlElement(summary)}
                ${TagsHtmlElement(tags, { color })}
            `;
			return SectionLayout("publication", index, content);
		},
	};
}
