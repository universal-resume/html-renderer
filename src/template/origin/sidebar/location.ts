type LocationArgs = {
	city: string;
	remote?: boolean;
};

export function Location({ city, remote }: LocationArgs) {
	return {
		build: () => {
			const ul = document.createElement("ul");
			ul.classList.add("py-4", "gap-3", "flex", "flex-col");
			const li = document.createElement("li");
			li.classList.add("text-white");
			li.innerHTML = `
            <span class="font-bold text-sm flex items-center justify-center gap-1">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="16"
                                height="16" stroke="currentColor" fill="currentColor"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/></svg>
                ${city}
                </span>
                ${remote ? '<span class="flex items-center justify-center text-xs">+ Remote everywhere</span>' : ""}
        `;
			ul.appendChild(li);
			return ul;
		},
	};
}
