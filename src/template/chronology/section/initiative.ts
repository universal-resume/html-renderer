import type { Initiative } from "@universal-resume/ts-schema";
import type { Lang, Theme } from "../../../renderer.js";
import { DateHtmlElement, SubDateHtmlElement } from "../component/date.js";
import { HighlightsHtmlElement } from "../component/highlights.js";
import { SectionLayout } from "../component/layout.js";
import { LinkHtmlElement } from "../component/link.js";
import { LocationHtmlElement } from "../component/location.js";
import { SummaryHtmlElement } from "../component/summary.js";
import { TagsHtmlElement } from "../component/tags.js";
import { TitleHtmlElement } from "../component/title.js";
import { TypeHtmlElement } from "../component/type.js";

const i18n = {
	en: {
		at: "at",
	},
	fr: {
		at: "chez",
	},
} as const;

export function InitiativeHtmlElement(
	{
		summary,
		endDate,
		highlights,
		location,
		name,
		position,
		startDate,
		tags,
		type,
		url,
	}: Initiative.Type,
	theme: Theme,
	lang: Lang,
	index: number,
) {
	return {
		build: () => {
			const main = `
                ${TitleHtmlElement({
									title: `<span class="text-sm"><strong>${position}</strong> ${i18n[lang].at} <strong>${name}</strong></span>`,
								})}
                ${LocationHtmlElement(location, theme)}
                ${LinkHtmlElement(url, theme)}
                ${SummaryHtmlElement(summary)}
                ${HighlightsHtmlElement(highlights)}
                ${TagsHtmlElement(tags, theme.color.primary)}
            `;
			const sidebar = `${DateHtmlElement({ startDate, endDate }, lang)} ${TypeHtmlElement({ type: "project" }, lang, theme.color.secondary)} ${TypeHtmlElement({ type }, lang, theme.color.primary)} ${SubDateHtmlElement({ startDate, endDate }, lang)}`;
			return SectionLayout("project", index, theme, main, sidebar);
		},
	};
}
