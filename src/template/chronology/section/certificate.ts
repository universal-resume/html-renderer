import type { Theme } from "@renderer";
import type { Certificate } from "@universal-resume/ts-schema";
import { DateHtmlElement } from "../component/date";
import { SectionLayout } from "../component/layout";
import { LinkHtmlElement } from "../component/link";
import { TagsHtmlElement } from "../component/tags";
import { TitleAndTypeHtmlElement } from "../component/title-and-type";

export function CertificateHtmlElement(
	{ name, issuer, date, url, tags }: Certificate.Type,
	theme: Theme,
	index: number,
) {
	return {
		build: () => {
			const main = `
                ${TitleAndTypeHtmlElement(
									{
										title: `<span class="text-sm"><strong>${name}</strong> by <strong>${issuer.name}</strong></span>`,
										type: "certificate",
									},
									theme.color.secondary,
								)}
				<div class="text-xs italic">Issued by ${issuer.name}</div>
                ${LinkHtmlElement(url, theme)}
                ${TagsHtmlElement(tags, theme.color.primary)}
            `;

			const sidebar = DateHtmlElement({ date });
			return SectionLayout("certificate", index, theme, main, sidebar);
		},
	};
}
