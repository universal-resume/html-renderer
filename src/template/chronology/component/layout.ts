import type { Theme } from "../../../renderer.js";

export const SectionLayout = (
	section: string,
	index: number,
	theme: Theme,
	content: string,
	sidebar?: string,
) => {
	const container = document.createElement("div");
	container.id = `${section}-${index}`;
	container.classList.add("flex", "relative");

	const sidebarContainer = document.createElement("div");
	sidebarContainer.classList.add(
		"w-1/4",
		"flex",
		"flex-col",
		"gap-1",
		"px-4",
		"items-center",
		"justify-center",
	);

	const mainContainer = document.createElement("div");
	mainContainer.classList.add("w-3/4", "px-4");
	const border = document.createElement("div");
	if (section !== "reference") {
		border.classList.add(
			"border-t",
			`border-${theme.color.primary}-200`,
			"py-4",
			"flex",
			"flex-col",
			"items-center",
		);
	} else {
		border.classList.add("pb-4");
	}
	mainContainer.appendChild(border);

	container.appendChild(sidebarContainer);
	container.appendChild(mainContainer);

	border.innerHTML = content;
	sidebarContainer.innerHTML = sidebar || "";

	return container;
};
