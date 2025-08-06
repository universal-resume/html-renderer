import { Resume } from "@universal-resume/ts-schema";
import { RendererActions } from "../template";
import { Theme } from "../renderer";
import { Sidebar } from "./origin/sidebar";
import { Avatar } from "./origin/sidebar/avatar";
import Summary from "./origin/sidebar/summary";
import Skills from "./origin/sidebar/skills";
import Profiles from "./origin/sidebar/profiles";
import Languages from "./origin/sidebar/languages";
import { Location } from "./origin/sidebar/location";
import { DriverLicenses } from "./origin/sidebar/driving";
import Contact from "./origin/sidebar/contact";
import { Body } from "./origin/body";
import { Header } from "./origin/body/section/header";
import {
	CertificateRenderer,
	ProjectRenderer,
	AwardRenderer,
	EducationRenderer,
	PublicationRenderer,
	ReferenceRenderer,
	VolunteerRenderer,
	WorkRenderer,
} from "./origin/body/section";

export async function origin(
	resume: Resume.Type,
	theme: Theme,
	{ addPage, getPages }: RendererActions,
) {
	const pages: Array<{
		sidebar: Sidebar;
		body: Body;
	}> = [];

	const newPage = () => {
		const page = addPage();
		const sidebar = Sidebar(theme);
		const body = Body(theme);
		page.element.appendChild(sidebar.element);
		page.element.appendChild(body.element);
		pages.push({
			sidebar,
			body,
		});
	};

	async function addSidebarItem(html: HTMLElement) {
		if (!pages[index]) {
			newPage();
		}
		try {
			const { height, limit } = await pages[index].sidebar.pushItem(html);
		} catch (e) {
			if (!pages[index + 1]) {
				newPage();
			}
			index = index + 1;
			await pages[index].sidebar.pushItem(html);
		}
	}

	async function addBodyItem(html: HTMLElement) {
		if (!pages[index]) {
			newPage();
		}
		try {
			const { height, limit } = await pages[index].body.pushItem(html);
		} catch (e) {
			if (!pages[index + 1]) {
				newPage();
			}
			let keepTopBorder = false;
			const last = pages[index].body.last();
			if (last && last.id && last.id.includes("section-title")) {
				const h2 = pages[index].body.pop();
				if (h2) {
					keepTopBorder = true;
					await pages[index + 1].body.pushItem(h2 as HTMLElement);
				}
			}
			index = index + 1;
			if (!keepTopBorder) {
				html.classList.remove("border-t", "pt-4");
			}
			await pages[index].body.pushItem(html);
		}
	}

	function generateSectionTitle(
		{ title, icon }: { title: string; icon: string },
		{ color }: Theme,
	) {
		const sectionTitle = document.createElement("h2");
		sectionTitle.setAttribute(
			"id",
			`section-title-${title.toLowerCase().replace(/ /g, "-")}`,
		);
		sectionTitle.classList.add(
			"text-md",
			"pb-1",
			"font-semibold",
			"flex",
			"items-center",
			"gap-2",
			`text-${color}-800`,
		);
		sectionTitle.innerHTML = icon;
		const span = document.createElement("span");
		span.textContent = title;
		sectionTitle.appendChild(span);
		return sectionTitle;
	}

	let index = 0;

	if (resume.basics.image) {
		await addSidebarItem(
			Avatar(
				{
					src: resume.basics.image,
					alt: resume.basics.name,
				},
				theme,
			).build(),
		);
	}

	if (resume.basics.summary) {
		await addSidebarItem(
			Summary({
				text: resume.basics.summary,
			}).build(),
		);
	}

	const skills = (resume.skills || [])
		.map((skill) => skill.tags)
		.flat()
		.filter((tag) => tag !== undefined);
	if (skills.length > 0) {
		await addSidebarItem(Skills(skills).build());
	}

	if (resume.basics.profiles && resume.basics.profiles.length > 0) {
		await addSidebarItem(Profiles([...resume.basics.profiles]).build());
	}

	if (resume.languages && resume.languages.length > 0) {
		await addSidebarItem(Languages([...resume.languages]).build());
	}

	if (resume.basics.location && resume.basics.location.city) {
		await addSidebarItem(
			Location({
				city: resume.basics.location.city,
				remote: resume.basics.location.remote,
			}).build(),
		);
	}

	if (resume.basics.driverLicenses && resume.basics.driverLicenses.length > 0) {
		await addSidebarItem(
			DriverLicenses([...resume.basics.driverLicenses]).build(),
		);
	}

	if (resume.basics.phone || resume.basics.email) {
		await addSidebarItem(
			Contact({
				phone: resume.basics.phone,
				email: resume.basics.email,
			}).build(),
		);
	}

	for (const reference of resume.references || []) {
		await addSidebarItem(ReferenceRenderer(reference, theme, index).build());
	}

	index = 0;

	await addBodyItem(
		Header(
			{
				name: resume.basics.name,
				headline: resume.basics.headline,
				url: resume.basics.url,
			},
			theme,
		).build(),
	);

	const sections = [
		{
			title: "Certificates",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18" height="18" stroke="currentColor" fill="currentColor"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.4-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z" /></svg>`,
			data: resume.certificates,
			generateItem: CertificateRenderer,
		},
		{
			title: "Projects",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="currentColor" width="18" height="18" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2l0 82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9l0-107.2c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" /></svg>`,
			data: resume.projects,
			generateItem: ProjectRenderer,
		},
		{
			title: "Awards",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="currentColor" width="18" height="18" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7L344.5 83c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7L301 344.5c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2 .8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1 .4 14.2-1.5 20.1-5.4L173.8 5.5zM272 192a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM1.3 441.8L44.4 339.3c.2 .1 .3 .2 .4 .4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7 .2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2L74.4 455.5l-56.1 8.3c-5.7 .8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1 .4-.2 .7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2 .2-.3 .4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z"/></svg>`,
			data: resume.awards,
			generateItem: AwardRenderer,
		},
		{
			title: "Jobs",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" width="18" height="18" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M48 0C21.5 0 0 21.5 0 48L0 464c0 26.5 21.5 48 48 48l96 0 0-80c0-26.5 21.5-48 48-48s48 21.5 48 48l0 80 96 0c26.5 0 48-21.5 48-48l0-416c0-26.5-21.5-48-48-48L48 0zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm112-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM80 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM272 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z" /></svg>`,
			data: resume.work,
			generateItem: WorkRenderer,
		},
		{
			title: "Publications",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="currentColor" width="18" height="18" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM80 64l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L80 96c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm54.2 253.8c-6.1 20.3-24.8 34.2-46 34.2L80 416c-8.8 0-16-7.2-16-16s7.2-16 16-16l8.2 0c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.7 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7c15.9 0 30.4 9 37.5 23.2l4.4 8.8 54.1 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 349l-9.8 32.8z" /></svg>`,
			data: resume.publications,
			generateItem: PublicationRenderer,
		},
		{
			title: "Volunteer Work",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="currentColor" width="18" height="18" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M224 0c17.7 0 32 14.3 32 32l0 208-64 0 0-208c0-17.7 14.3-32 32-32zm96 160c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32zm64 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64zM93.3 51.2L175.9 240l-69.9 0L34.7 76.8C27.6 60.6 35 41.8 51.2 34.7s35.1 .3 42.1 16.5zm27 221.3l-.2-.5 69.9 0 26.1 0c22.1 0 40 17.9 40 40s-17.9 40-40 40l-56 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l56 0c39.8 0 72-32.2 72-72l0-.6c9.4 5.4 20.3 8.6 32 8.6c13.2 0 25.4-4 35.6-10.8c8.7 24.9 32.5 42.8 60.4 42.8c11.7 0 22.6-3.1 32-8.6l0 8.6c0 88.4-71.6 160-160 160l-61.7 0c-42.4 0-83.1-16.9-113.1-46.9l-11.6-11.6C77.5 429.5 64 396.9 64 363l0-27c0-32.7 24.6-59.7 56.3-63.5z" /></svg>`,
			data: resume.volunteers,
			generateItem: VolunteerRenderer,
		},
		{
			title: "Education",
			icon: `<svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="currentColor" width="18" height="18" viewBox="0 0 640 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9l0 28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5l0-24.6c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z" /></svg>`,
			data: resume.education,
			generateItem: EducationRenderer,
		},
	];
	for (const section of sections) {
		if (section.data && section.data.length > 0) {
			const sectionTitle = generateSectionTitle(
				{
					title: section.title,
					icon: section.icon,
				},
				theme,
			);

			await addBodyItem(sectionTitle);
			for (const [index, item] of section.data.entries()) {
				const domElement = document.createElement("div");
				console.log(item);
				domElement.classList.add("pt-4", "pb-4", "border-t");
				// @ts-ignore
				domElement.innerHTML = section.generateItem(item, theme, index).build();
				await addBodyItem(domElement);
			}
		}
	}
}
