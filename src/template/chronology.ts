import type { Theme } from "@renderer";
import type {
	Award,
	Certificate,
	Education,
	Project,
	Publication,
	Reference,
	Resume,
	Volunteer,
	Work,
} from "@universal-resume/ts-schema";
import type { RendererActions } from "../template";
import { AwardHtmlElement } from "./chronology/section/award";
import { CertificateHtmlElement } from "./chronology/section/certificate";
import { EducationHtmlElement } from "./chronology/section/education";
import { HeaderHtmlElement } from "./chronology/section/header";
import { ProjectHtmlElement } from "./chronology/section/project";
import { PublicationHtmlElement } from "./chronology/section/publication";
import { ReferenceHtmlElement } from "./chronology/section/reference";
import { VolunteerHtmlElement } from "./chronology/section/volunteer";
import { WorkHtmlElement } from "./chronology/section/work";

type Chronology = Array<
	| { __tag: "work"; item: Work.Type; date: Date }
	| { __tag: "education"; item: Education.Type; date: Date }
	| { __tag: "award"; item: Award.Type; date: Date }
	| { __tag: "certificate"; item: Certificate.Type; date: Date }
	| { __tag: "project"; item: Project.Type; date: Date }
	| { __tag: "publication"; item: Publication.Type; date: Date }
	| { __tag: "volunteer"; item: Volunteer.Type; date: Date }
	| { __tag: "reference"; item: Reference.Type; date: Date }
>;

type CurrentPage = {
	container: HTMLElement;
	index: number;
	height: number;
};

const fromResume = (resume: Resume.Type): Chronology => {
	const chronology: Chronology = [];
	if (resume.work) {
		chronology.push(
			...resume.work.map((work) => ({
				__tag: "work" as const,
				item: work,
				date: work.startDate,
			})),
		);
	}
	if (resume.education) {
		chronology.push(
			...resume.education.map((education) => ({
				__tag: "education" as const,
				item: education,
				date: education.startDate,
			})),
		);
	}
	if (resume.awards) {
		chronology.push(
			...resume.awards.map((award) => ({
				__tag: "award" as const,
				item: award,
				date: award.date,
			})),
		);
	}
	if (resume.certificates) {
		chronology.push(
			...resume.certificates.map((certificate) => ({
				__tag: "certificate" as const,
				item: certificate,
				date: certificate.date,
			})),
		); // TODO: add date
	}
	if (resume.projects) {
		chronology.push(
			...resume.projects.map((project) => ({
				__tag: "project" as const,
				item: project,
				date: project.startDate,
			})),
		);
	}
	if (resume.publications) {
		chronology.push(
			...resume.publications.map((publication) => ({
				__tag: "publication" as const,
				item: publication,
				date: publication.date,
			})),
		); // TODO: add date
	}
	if (resume.volunteers) {
		chronology.push(
			...resume.volunteers.map((volunteer) => ({
				__tag: "volunteer" as const,
				item: volunteer,
				date: volunteer.startDate,
			})),
		);
	}
	if (resume.references) {
		chronology.push(
			...resume.references.map((reference) => ({
				__tag: "reference" as const,
				item: reference,
				date: reference.date,
			})),
		);
	}
	return chronology.sort((a, b) => b.date.getTime() - a.date.getTime());
};

const createPage = (theme: Theme, actions: RendererActions): CurrentPage => {
	const createBackground = (theme: Theme) => {
		const background = document.createElement("div");
		background.classList.add(
			"chronology-background",
			"absolute",
			"inset-0",
			"bg-white",
			"z-0",
		);
		const sidebar = document.createElement("div");
		sidebar.classList.add(
			"chronology-sidebar",
			"w-1/4",
			"h-full",
			`bg-${theme.color.primary}-500`,
		);
		background.appendChild(sidebar);
		return background;
	};

	const createContainer = () => {
		const container = document.createElement("div");
		container.classList.add(
			"chronology-content-container",
			"absolute",
			"inset-0",
			"flex",
			"flex-col",
			"z-1",
		);
		return container;
	};

	const background = createBackground(theme);
	const container = createContainer();

	const root = document.createElement("div");
	root.classList.add("chronology-template-page", "h-full", "relative");
	root.appendChild(background);
	root.appendChild(container);

	const page = actions.addPage();
	page.element.appendChild(root);
	return {
		container,
		index: page.index,
		height: 0,
	};
};

const tryAppend = (current: CurrentPage, html: HTMLElement) => {
	return new Promise<{ height: number; limit: number }>((resolve, reject) => {
		current.container.appendChild(html);
		requestAnimationFrame(() => {
			const last = current.container.lastChild as HTMLElement;
			if (current.height + last.offsetHeight > current.container.offsetHeight) {
				reject({
					height: current.height + last.offsetHeight,
					limit: current.container.offsetHeight,
				});
				current.container.removeChild(last);
			} else {
				resolve({
					height: current.height + last.offsetHeight,
					limit: current.container.offsetHeight,
				});
			}
		});
	});
};

const addSection = async (
	current: CurrentPage,
	html: HTMLElement,
	theme: Theme,
	actions: RendererActions,
): Promise<CurrentPage> => {
	try {
		const { height } = await tryAppend(current, html);
		current.height = height;
		return current;
	} catch {
		current.container.classList.add("justify-around");
		current = createPage(theme, actions);
		const border = html.childNodes[1].childNodes[0] as HTMLElement;
		if (border) {
			border.classList.remove("border-t");
		}
		const { height } = await tryAppend(current, html);
		current.height = height;
		return current;
	}
};

export async function chronology(
	resume: Resume.Type,
	theme: Theme,
	actions: RendererActions,
) {
	let page = createPage(theme, actions);

	const header = HeaderHtmlElement(
		{
			basics: resume.basics,
			skills: [...(resume.skills || [])],
		},
		theme,
	).build({ id: "header" });
	page = await addSection(page, header, theme, actions);

	const sections = fromResume(resume);
	for (const [index, section] of sections.entries()) {
		let htmlElement: HTMLElement;
		switch (section.__tag) {
			case "work":
				htmlElement = WorkHtmlElement(section.item, theme, index).build();
				break;
			case "education":
				htmlElement = EducationHtmlElement(section.item, theme, index).build();
				break;
			case "award":
				htmlElement = AwardHtmlElement(section.item, theme, index).build();
				break;
			case "certificate":
				htmlElement = CertificateHtmlElement(
					section.item,
					theme,
					index,
				).build();
				break;
			case "project":
				htmlElement = ProjectHtmlElement(section.item, theme, index).build();
				break;
			case "publication":
				htmlElement = PublicationHtmlElement(
					section.item,
					theme,
					index,
				).build();
				break;
			case "volunteer":
				htmlElement = VolunteerHtmlElement(section.item, theme, index).build();
				break;
			case "reference":
				htmlElement = ReferenceHtmlElement(section.item, theme, index).build();
				break;
		}
		page = await addSection(page, htmlElement, theme, actions);
	}
}
