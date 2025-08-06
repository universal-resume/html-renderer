import { Theme } from "../../renderer";

export type Body = {
	element: HTMLElement;
	pushItem: (item: HTMLElement) => Promise<{ height: number; limit: number }>;
	last: () => HTMLElement | null;
	pop: () => ChildNode | undefined;
};

export function Body({ color }: Theme): Body {
	const pageHeightContainer = document.createElement("div");
	pageHeightContainer.classList.add("page-body", "w-3/4", "min-h-full", "p-4");
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
		last: () => dynamicHeightContainer.lastChild as HTMLElement | null,
		pop: () => {
			if (dynamicHeightContainer.lastChild) {
				return dynamicHeightContainer.removeChild(
					dynamicHeightContainer.lastChild,
				);
			}
			return undefined;
		},
	};
}
