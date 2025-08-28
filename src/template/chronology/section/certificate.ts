import type { Certificate } from "@universal-resume/ts-schema";
import type { Lang, Theme } from "../../../renderer.js";
import { DateHtmlElement, SubDateHtmlElement } from "../component/date.js";
import { SectionLayout } from "../component/layout.js";
import { LinkHtmlElement } from "../component/link.js";
import { TagsHtmlElement } from "../component/tags.js";
import { TitleHtmlElement } from "../component/title.js";
import { TypeHtmlElement } from "../component/type.js";

const i18n = {
	en: {
		issued_by: "Issued by",
	},
	fr: {
		issued_by: "Délivré par",
	},
} as const;

export function CertificateHtmlElement(
	{ name, issuer, date, url, tags }: Certificate.Type,
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
				<div class="text-xs italic">${i18n[lang].issued_by} ${issuer.name}</div>
                ${LinkHtmlElement(url, theme)}
                ${TagsHtmlElement(tags, theme.color.primary)}
            `;

			const sidebar = `${DateHtmlElement({ date }, lang)} ${TypeHtmlElement({ type: "certificate" }, lang, theme.color.secondary)} ${SubDateHtmlElement({ date }, lang)}`;
			return SectionLayout("certificate", path, theme, main, sidebar);
		},
	};
}
