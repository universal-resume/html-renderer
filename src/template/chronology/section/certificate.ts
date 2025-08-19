import type { Certificate } from "@universal-resume/ts-schema";
import type { Theme } from "../../../renderer.js";
import { DateHtmlElement, SubDateHtmlElement } from "../component/date.js";
import { SectionLayout } from "../component/layout.js";
import { LinkHtmlElement } from "../component/link.js";
import { TagsHtmlElement } from "../component/tags.js";
import { TitleHtmlElement } from "../component/title.js";
import { TypeHtmlElement } from "../component/type.js";

export function CertificateHtmlElement(
	{ name, issuer, date, url, tags }: Certificate.Type,
	theme: Theme,
	index: number,
) {
	return {
		build: () => {
			const main = `
                ${TitleHtmlElement({
									title: `<span class="text-sm"><strong>${name}</strong> by <strong>${issuer.name}</strong></span>`,
								})}
				<div class="text-xs italic">Issued by ${issuer.name}</div>
                ${LinkHtmlElement(url, theme)}
                ${TagsHtmlElement(tags, theme.color.primary)}
            `;

			const sidebar = `${DateHtmlElement({ date })} ${TypeHtmlElement({ type: "certificate" }, theme.color.secondary)} ${SubDateHtmlElement({ date })}`;
			return SectionLayout("certificate", index, theme, main, sidebar);
		},
	};
}
