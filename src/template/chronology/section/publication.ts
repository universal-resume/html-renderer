import type { Publication } from "@universal-resume/ts-schema";
import type { Lang, Theme } from "../../../renderer.js";
import { DateHtmlElement, SubDateHtmlElement } from "../component/date.js";
import { SectionLayout } from "../component/layout.js";
import { LinkHtmlElement } from "../component/link.js";
import { SummaryHtmlElement } from "../component/summary.js";
import { TagsHtmlElement } from "../component/tags.js";
import { TitleHtmlElement } from "../component/title.js";
import { TypeHtmlElement } from "../component/type.js";

const i18n = {
	en: {
		published_at: "Published at",
	},
	fr: {
		published_at: "Publié par",
	},
} as const;

export function PublicationHtmlElement(
	{ name, publisher, date, summary, url, tags }: Publication.Type,
	theme: Theme,
	lang: Lang,
	path: string,
) {
	return {
		build: () => {
			const main = `
                ${TitleHtmlElement({
									title: `<span class="text-sm"><strong>${name}</strong></span>`,
								})}
				${publisher ? `<div class="text-xs italic text-center">${i18n[lang].published_at} ${publisher.name}</div>` : ""}
                ${LinkHtmlElement(url, theme)}
                ${SummaryHtmlElement(summary)}
                ${TagsHtmlElement(tags, theme.color.primary)}
            `;
			const sidebar = `${DateHtmlElement({ date }, lang)} ${TypeHtmlElement({ type: "publication" }, lang, theme.color.secondary)} ${SubDateHtmlElement({ date }, lang)}`;
			return SectionLayout("publication", path, theme, main, sidebar);
		},
	};
}
