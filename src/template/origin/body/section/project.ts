import { Project } from "@universal-resume/ts-schema";
import { Theme } from "../../../../renderer";
import { TitleAndDate } from "../title-and-date";
import { Location } from "../location";
import { Summary } from "../summary";
import { Tags } from "../tags";
import { Layout } from "../layout";
import { Link } from "../link";
import { Highlights } from "../highlights";

export function ProjectRenderer(
	{
		name,
		description,
		url,
		startDate,
		endDate,
		roles,
		tags,
		location,
		entity,
		highlights,
		status,
		type,
	}: Project.Type,
	{ color }: Theme,
	index: number,
) {
	return {
		build: () => {
			const title = `<span>${roles ? `${roles.map((role) => `<strong>${role}</strong>`).join(", ")} for ` : ""} ${name ? `<strong>${name}</strong>` : ""}</span>`;
			const content = `
                ${TitleAndDate({ title, startDate, endDate }, { color })}
                ${Location(location, { color })}
                ${Link(url, { color })}
                ${Summary(description, { color })}
                ${Highlights(highlights, { color })}
                ${Tags(tags, { color })}
            `;
			return Layout("project", index, content);
		},
	};
}
