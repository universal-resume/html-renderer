import type { Theme } from "@renderer";
import type { Reference } from "@universal-resume/ts-schema";
import { SectionLayout } from "../component/layout";
import { TagsHtmlElement } from "../component/tags";

export function ReferenceHtmlElement(
	{ name, testimonial, position, organization }: Reference.Type,
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
			const sidebar = TagsHtmlElement(["Reference"], theme.color.secondary);
			return SectionLayout("reference", index, theme, content, sidebar);
		},
	};
}
