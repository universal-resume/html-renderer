import { Reference } from "@universal-resume/ts-schema";
import { Theme } from "../../../renderer";

export function ReferenceRenderer(
	{ name, testimonial, company, contact, position }: Reference.Type,
	{ color }: Theme,
	index: number,
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
			container.innerHTML = `
            <div class="text-xs italic text-center w-full text-${color}-200">“${testimonial}”</div>
            <div class="text-xs font-bold text-center w-full text-white">${name}</div>
            <div class="text-xs text-center w-full text-${color}-200">${position}</div>
            `;
			return container;
		},
	};
}
