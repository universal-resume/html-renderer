import { Certificate } from "@universal-resume/ts-schema";
import { Theme } from "../../../../renderer";
import { TitleAndDate } from "../title-and-date";
import { Link } from "../link";
import { Tags } from "../tags";
import { Layout } from "../layout";

export function CertificateRenderer(
	{ name, issuer, issueDate, url, tags }: Certificate.Type,
	{ color }: Theme,
	index: number,
) {
	return {
		build: () => {
			const title = `<span><strong>${name}</strong> ${issuer ? `by <strong>${issuer}</strong>` : ""}</span>`;
			const content = `
                ${TitleAndDate({ title, date: issueDate }, { color })}
                ${Link(url, { color })}
                ${Tags(tags, { color })}
            `;
			return Layout("certificate", index, content);
		},
	};
}
