import type { Theme } from "../../../renderer";

type AvatarArgs = {
	src: string;
	alt?: string | undefined;
};

export function Avatar({ src, alt }: AvatarArgs, { color }: Theme) {
	return {
		build: () => {
			const img = document.createElement("img");
			img.src = src;
			img.alt = alt || "profile picture";
			img.classList.add(
				"w-24",
				"h-24",
				"rounded-full",
				"border-4",
				`border-${color}-300`,
			);
			const container = document.createElement("div");
			container.classList.add("flex", "items-center", "justify-center");
			container.appendChild(img);
			return container;
		},
	};
}
