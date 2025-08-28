import type { Lang, Theme } from "../../../renderer.js";
import { SectionLayout } from "../component/layout.js";
import { TypeHtmlElement } from "../component/type.js";

const i18n = {
	en: {
		at: "at",
	},
	fr: {
		at: "chez",
	},
} as const;

export function ReferenceHtmlElement(
	{
		name,
		testimonial,
		position,
		organization,
	}: {
		name: string;
		testimonial: string;
		position?: string;
		organization?: { name: string };
	},
	theme: Theme,
	lang: Lang,
	path: string,
) {
	return {
		build: () => {
			const container = document.createElement("div");
			container.classList.add(
				"flex",
				"flex-col",
				"gap-1",
				"py-4",
				"px-2",
				"items-center",
				"text-white",
			);
			const content = `
            <div class="text-xs italic text-center w-full">“${testimonial}”</div>
            <div class="text-xs text-center w-full pt-2"><span class="font-bold">${name}</span> ${position ? `, ${position}` : ""} ${organization ? ` ${i18n[lang].at} ${organization.name}` : ""}</div>
            `;
			const sidebar = TypeHtmlElement(
				{ type: "reference" },
				lang,
				theme.color.secondary,
			);
			return SectionLayout("reference", path, theme, content, sidebar);
		},
	};
}
