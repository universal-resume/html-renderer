import type { Theme } from "@renderer";
import { SectionLayout } from "../component/layout";
import { TypeHtmlElement } from "../component/type";

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
	index: number,
) {
	return {
		build: () => {
			const container = document.createElement("div");
			container.id = `reference-${index}`;
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
            <div class="text-xs text-center w-full pt-2"><span class="font-bold">${name}</span> ${position ? `, ${position}` : ""} ${organization ? ` at ${organization.name}` : ""}</div>
            `;
			const sidebar = TypeHtmlElement(
				{ type: "reference" },
				theme.color.secondary,
			);
			return SectionLayout("reference", index, theme, content, sidebar);
		},
	};
}
