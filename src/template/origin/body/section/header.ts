type HeaderArgs = {
	name: string;
	headline: string;
	url?: string | undefined;
};

type Theme = {
	color: string;
};

export function Header({ name, headline, url }: HeaderArgs, { color }: Theme) {
	return {
		build: () => {
			const headerRightBlock = document.createElement("div");
			headerRightBlock.classList.add("grid", "justify-items-end");

			const headerRightBlockName = document.createElement("h1");
			headerRightBlockName.classList.add("text-xl", "font-extrabold");
			headerRightBlockName.textContent = name;
			headerRightBlock.appendChild(headerRightBlockName);

			const headerRightBlockHeadline = document.createElement("p");
			headerRightBlockHeadline.classList.add("text-lg", "mt-1");
			headerRightBlockHeadline.innerHTML = `<mark>${headline}</mark>`;
			headerRightBlock.appendChild(headerRightBlockHeadline);

			if (url) {
				const headerRightBlockUrl = document.createElement("p");
				headerRightBlockUrl.classList.add("text-sm", "mt-1");
				headerRightBlockUrl.innerHTML = `<a href="${url}" class="text-${color}-600">${url}</a>`;
				headerRightBlock.appendChild(headerRightBlockUrl);
			}

			const header = document.createElement("div");
			header.setAttribute("id", "header");
			header.classList.add("w-full", "relative");
			header.appendChild(headerRightBlock);

			return header;
		},
	};
}
