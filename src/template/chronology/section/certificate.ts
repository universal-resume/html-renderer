import type { Theme } from "@renderer";
import type { Certificate } from "@universal-resume/ts-schema";
import { DateHtmlElement, SubDateHtmlElement } from "../component/date";
import { SectionLayout } from "../component/layout";
import { LinkHtmlElement } from "../component/link";
import { TagsHtmlElement } from "../component/tags";
import { TitleHtmlElement } from "../component/title";
import { TypeHtmlElement } from "../component/type";

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
