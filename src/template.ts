import type { Resume } from "@universal-resume/ts-schema";
import type { Theme } from "./renderer.js";
import { chronology } from "./template/chronology.js";

export const TEMPLATES = {
	chronology: chronology,
} as const;
export const DEFAULT_TEMPLATE: TemplateId = "chronology";

export type TemplateId = keyof typeof TEMPLATES;

export type Page = {
	index: number;
	element: HTMLElement;
};

export type RendererActions = {
	addPage: () => Page;
	getPages: () => Page[];
};

const createPageStyles = () => {
	const styles = document.getElementById("page-styles");
	if (!styles) {
		const pageStyles = document.createElement("style");
		pageStyles.type = "text/css";
		pageStyles.innerHTML = `
            .page {
                page-break-after: always;
                width: 210mm;
                height: 297mm;
                box-sizing: border-box;
                background-color: white;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                margin-top: 32px;
            }
            .page:last-child {
                margin-bottom: 32px;
            }
            @media print {
                html {
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                }

                .page {
                    margin-top: 0;
                    margin-bottom: 0;
                }

                .page:last-child {
                    margin-bottom: 0;
                }
            }
        `;

		document.head.appendChild(pageStyles);
	}
};

export const Template = (id: TemplateId = DEFAULT_TEMPLATE) => {
	const renderer = TEMPLATES[id];

	if (!renderer) {
		throw new Error(`Template "${id}" not found`);
	}

	createPageStyles();

	const pages: Page[] = [];

	const addPage = (parent: HTMLElement) => (): Page => {
		const index = pages.length;
		const domElement = document.createElement("div");
		const page = {
			index,
			element: domElement,
		};

		domElement.id = `page-${index + 1}`;
		domElement.classList.add("page");

		pages.push(page);

		parent.appendChild(page.element);

		return page;
	};

	const getPages = () => pages;

	return {
		render: (resume: Resume.Type, domElement: HTMLElement, theme: Theme) =>
			renderer(resume, theme, {
				addPage: addPage(domElement),
				getPages,
			}),
	};
};
