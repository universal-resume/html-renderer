import { Publication } from "@universal-resume/ts-schema";
import { Theme } from "../../../../renderer";
import { TitleAndDate } from "../title-and-date";
import { Layout } from "../layout";
import { Link } from "../link";
import { Summary } from "../summary";
import { Tags } from "../tags";

export function PublicationRenderer(
	{
		name,
		publisher,
		releaseDate,
		summary,
		url,
		authors,
		doi,
		tags,
		type,
	}: Publication.Type,
	{ color }: Theme,
	index: number,
) {
	return {
		build: () => {
			const title = `<span><strong>${name}</strong> ${publisher ? `by <strong>${publisher}</strong>` : ""}</span>`;
			const content = `
                ${TitleAndDate({ title, date: releaseDate }, { color })}
                ${Link(url, { color })}
                ${Summary(summary, { color })}
                ${Tags(tags, { color })}
            `;
			return Layout("publication", index, content);
		},
	};
}
