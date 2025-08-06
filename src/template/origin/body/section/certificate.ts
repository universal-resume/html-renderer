import type { Certificate } from "@universal-resume/ts-schema";
import type { Theme } from "../../../../renderer";
import { SectionLayout } from "../layout";
import { LinkHtmlElement } from "../link";
import { TagsHtmlElement } from "../tags";
import { TitleAndDateHtmlElement } from "../title-and-date";

export function CertificateHtmlElement(
	{ name, issuer, issueDate, url, tags }: Certificate.Type,
	{ color }: Theme,
	index: number,
) {
	return {
		build: () => {
			const title = `<span><strong>${name}</strong> ${issuer ? `by <strong>${issuer}</strong>` : ""}</span>`;
			const content = `
                ${TitleAndDateHtmlElement({ title, date: issueDate })}
                ${LinkHtmlElement(url, { color })}
                ${TagsHtmlElement(tags, { color })}
            `;
			return SectionLayout("certificate", index, content);
		},
	};
}
