import { Theme } from "../../..";

export type Sidebar = {
	element: HTMLElement;
	pushItem: (item: HTMLElement) => Promise<{ height: number; limit: number }>;
};

export function Sidebar({ color }: Theme): Sidebar {
	const pageHeightContainer = document.createElement("div");
	pageHeightContainer.classList.add(
		"page-sidebar",
		"w-1/4",
		"min-h-full",
		`bg-${color}-900`,
		"p-4",
	);
	const dynamicHeightContainer = document.createElement("div");
	dynamicHeightContainer.classList.add("w-full", "relative");
	pageHeightContainer.appendChild(dynamicHeightContainer);

	function pushItem(item: HTMLElement) {
		return new Promise<{ height: number; limit: number }>((resolve, reject) => {
			const dynamicContainerMaxHeight = pageHeightContainer.offsetHeight - 32;
			dynamicHeightContainer.appendChild(item);
			requestAnimationFrame(() => {
				if (
					dynamicHeightContainer.offsetHeight > dynamicContainerMaxHeight &&
					dynamicHeightContainer.lastChild
				) {
					dynamicHeightContainer.removeChild(dynamicHeightContainer.lastChild);
					reject({
						height: dynamicHeightContainer.offsetHeight,
						limit: dynamicContainerMaxHeight,
					});
				} else {
					resolve({
						height: dynamicHeightContainer.offsetHeight,
						limit: dynamicContainerMaxHeight,
					});
				}
			});
		});
	}

	return {
		pushItem,
		element: pageHeightContainer,
	};
}
