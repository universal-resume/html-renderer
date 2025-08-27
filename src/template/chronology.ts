import type {
	Award,
	Certificate,
	Education,
	Employment,
	Initiative,
	Publication,
	Resume,
} from "@universal-resume/ts-schema";
import type { Lang, Theme } from "../renderer.js";
import type { RendererActions } from "../template.js";
import { AwardHtmlElement } from "./chronology/section/award.js";
import { CertificateHtmlElement } from "./chronology/section/certificate.js";
import { EducationHtmlElement } from "./chronology/section/education.js";
import { EmploymentHtmlElement } from "./chronology/section/employment.js";
import { HeaderHtmlElement } from "./chronology/section/header.js";
import { InitiativeHtmlElement } from "./chronology/section/initiative.js";
import { PublicationHtmlElement } from "./chronology/section/publication.js";
import { ReferenceHtmlElement } from "./chronology/section/reference.js";

type Chronology = Array<
	| { __tag: "employment"; item: Employment.Type; date: Date }
	| { __tag: "education"; item: Education.Type; date: Date }
	| { __tag: "award"; item: Award.Type; date: Date }
	| { __tag: "certificate"; item: Certificate.Type; date: Date }
	| { __tag: "initiative"; item: Initiative.Type; date: Date }
	| { __tag: "publication"; item: Publication.Type; date: Date }
>;

type CurrentPage = {
	container: HTMLElement;
	index: number;
	height: number;
};

const fromResume = (resume: Resume.Type): Chronology => {
	const chronology: Chronology = [];
	if (resume.employments && resume.employments.length > 0) {
		chronology.push(
			...resume.employments.map((employment) => ({
				__tag: "employment" as const,
				item: employment,
				date: employment.startDate,
			})),
		);
	}
	if (resume.education && resume.education.length > 0) {
		chronology.push(
			...resume.education.map((education) => ({
				__tag: "education" as const,
				item: education,
				date: education.startDate,
			})),
		);
	}
	if (resume.awards && resume.awards.length > 0) {
		chronology.push(
			...resume.awards.map((award) => ({
				__tag: "award" as const,
				item: award,
				date: award.date,
			})),
		);
	}
	if (resume.certificates && resume.certificates.length > 0) {
		chronology.push(
			...resume.certificates.map((certificate) => ({
				__tag: "certificate" as const,
				item: certificate,
				date: certificate.date,
			})),
		);
	}
	if (resume.initiatives && resume.initiatives.length > 0) {
		chronology.push(
			...resume.initiatives.map((initiative) => ({
				__tag: "initiative" as const,
				item: initiative,
				date: initiative.startDate,
			})),
		);
	}
	if (resume.publications && resume.publications.length > 0) {
		chronology.push(
			...resume.publications.map((publication) => ({
				__tag: "publication" as const,
				item: publication,
				date: publication.date,
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
			`bg-${theme.color.primary}-900`,
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
		if (html.id.includes("reference")) {
			(html.childNodes[1].childNodes[0] as HTMLElement).classList.add("py-4");
		}
		const { height } = await tryAppend(current, html);
		current.height = height;
		return current;
	}
};

export async function chronology(
	resume: Resume.Type,
	theme: Theme,
	lang: Lang,
	actions: RendererActions,
) {
	let page = createPage(theme, actions);

	const header = HeaderHtmlElement(
		{
			basics: resume.basics,
			skills: [...(resume.skills || [])],
		},
		theme,
		lang,
	).build({ id: "header" });
	page = await addSection(page, header, theme, actions);

	const sections = fromResume(resume);
	for (const [index, section] of sections.entries()) {
		let htmlElement: HTMLElement;
		switch (section.__tag) {
			case "employment":
				htmlElement = EmploymentHtmlElement(
					section.item,
					theme,
					lang,
					index,
				).build();
				break;
			case "education":
				htmlElement = EducationHtmlElement(
					section.item,
					theme,
					lang,
					index,
				).build();
				break;
			case "award":
				htmlElement = AwardHtmlElement(
					section.item,
					theme,
					lang,
					index,
				).build();
				break;
			case "certificate":
				htmlElement = CertificateHtmlElement(
					section.item,
					theme,
					lang,
					index,
				).build();
				break;
			case "initiative":
				htmlElement = InitiativeHtmlElement(
					section.item,
					theme,
					lang,
					index,
				).build();
				break;
			case "publication":
				htmlElement = PublicationHtmlElement(
					section.item,
					theme,
					lang,
					index,
				).build();
				break;
		}
		page = await addSection(page, htmlElement, theme, actions);
		if (
			(section.__tag === "employment" || section.__tag === "initiative") &&
			section.item.references &&
			section.item.references.length > 0
		) {
			const references = section.item.references;
			for (const reference of references) {
				if (reference.name && reference.testimonial) {
					const referenceHtml = ReferenceHtmlElement(
						{
							name: reference.name,
							testimonial: reference.testimonial,
							...(reference.position !== undefined
								? { position: reference.position }
								: {}),
							...(section.item.organization !== undefined
								? { organization: section.item.organization }
								: {}),
						},
						theme,
						lang,
						index,
					).build();
					page = await addSection(page, referenceHtml, theme, actions);
				}
			}
		}
	}
}
