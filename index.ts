import { examples } from "@universal-resume/json-examples";
import { DEFAULT_LANG, Lang, LANGUAGES, Renderer } from "./src/renderer.js";
import { TemplateId } from "./src/template.js";
import defaultJson from './resume.json'

const COLORS = ["red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose", "slate", "gray", "zinc", "stone"];

const resumes = [{ name: "Custom", location: "./resume.json" }, ...examples];

function escapeHTML(str: string) {
	return str
	  .replace(/&/g, "&amp;")
	  .replace(/</g, "&lt;")
	  .replace(/>/g, "&gt;")
	  .replace(/"/g, "&quot;")
	  .replace(/'/g, "&#39;");
  }

function errorHandling (error: Error, domElement = document.body) {
	const banner = document.createElement("div");

	banner.innerHTML = `<div class="fixed gap-4 flex w-[calc(70%-2rem)] p-4 -translate-x-1/2 bg-white border border-gray-100 rounded-lg shadow-xs left-1/2 top-6">
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="32" height="32" viewBox="0 0 256 256" xml:space="preserve">
			<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
				<path d="M 28.5 65.5 c -1.024 0 -2.047 -0.391 -2.829 -1.172 c -1.562 -1.562 -1.562 -4.095 0 -5.656 l 33 -33 c 1.561 -1.562 4.096 -1.562 5.656 0 c 1.563 1.563 1.563 4.095 0 5.657 l -33 33 C 30.547 65.109 29.524 65.5 28.5 65.5 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
				<path d="M 61.5 65.5 c -1.023 0 -2.048 -0.391 -2.828 -1.172 l -33 -33 c -1.562 -1.563 -1.562 -4.095 0 -5.657 c 1.563 -1.562 4.095 -1.562 5.657 0 l 33 33 c 1.563 1.562 1.563 4.095 0 5.656 C 63.548 65.109 62.523 65.5 61.5 65.5 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
				<path d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z M 45 8 C 24.598 8 8 24.598 8 45 c 0 20.402 16.598 37 37 37 c 20.402 0 37 -16.598 37 -37 C 82 24.598 65.402 8 45 8 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
			</g>
		</svg>
		<div class="flex flex-col gap-2 text-sm font-normal">
			<h2 class="text-2xl font-bold">Something went wrong</h2>
			<pre class="text-gray-500 overflow-x-auto whitespace-pre-wrap">${error instanceof Error ? error.name : 'Error'}: ${escapeHTML(error instanceof Error ? error.message : String(error))}</pre>
		</div>
	</div>`;

	domElement.innerHTML = "";
	domElement.appendChild(banner);

	console.error(error);
}

async function loadJson(location: string) {
	let result;

	try {
		result = await fetch(location);

		if (!result.ok) {
			throw new Error(`Failed to load JSON from ${location}`);
		}
	} catch (error) {
		throw new Error(`Failed to load JSON from ${location}`);
	}

	try {
		return await result.json();
	} catch (error) {
		throw new Error(`Failed to parse JSON from ${location}`);
	}
}

window.addEventListener("load", async () => {
	let json = defaultJson;
	let template: TemplateId = "chronology" as const;
	let primaryColor = "indigo";
	let secondaryColor = "rose";
	let lang: Lang = DEFAULT_LANG;
	(document.getElementById("langName") as HTMLButtonElement).textContent = LANGUAGES[DEFAULT_LANG].label;

	const resumeChanged = async (location: string) => {
		try {
			json = await loadJson(location);

			await render();
		} catch (error) {
			errorHandling(error, document.getElementById("resume") ?? undefined);
		}
	}

	const langChanged = async (value: Lang) => {
	(document.getElementById("langName") as HTMLButtonElement).textContent = LANGUAGES[value].label;

		lang = value;

		await render();
	}
	
	const primaryColorChanged = async (color: string) => {
		const button = document.getElementById("dropdownButtonPrimaryColor");

		if (button) {
			button.classList.remove(`text-${primaryColor}-700`, `bg-${primaryColor}-200`, `hover:bg-${primaryColor}-300`);
			button.classList.add(`text-${color}-700`, `bg-${color}-200`, `hover:bg-${color}-300`);
		}

		primaryColor = color;

		await render();
	}

	const secondaryColorChanged = async (color: string) => {
		const button = document.getElementById("dropdownButtonSecondaryColor");

		if (button) {
			button.classList.remove(`text-${secondaryColor}-700`, `bg-${secondaryColor}-200`, `hover:bg-${secondaryColor}-300`);
			button.classList.add(`text-${color}-700`, `bg-${color}-200`, `hover:bg-${color}-300`);
		}

		secondaryColor = color;

		await render();
	}

	const render = async () => {
		const domElement = document.getElementById("resume");

		try {
			if (!domElement) {
				throw new Error('DOM element with ID "resume" not found');
			}

			domElement.innerHTML = "";

			await Renderer(json, {
				template,
				theme: {
					color: {
						primary: primaryColor,
						secondary: secondaryColor,
					},
				},
				domElement,
				lang,
			});
		} catch (error) {
			errorHandling(error, document.getElementById("resume") ?? undefined)
		}
	}

	await render();

	const dropdownResume = document.getElementById("dropdownResume");
	const resumeList = dropdownResume?.querySelector("ul");

	if (resumeList) {
		for (const resume of resumes) {
			const li = document.createElement("li");

			li.classList.add("cursor-pointer", "block", "px-4", "py-1", "hover:font-bold", "flex", "items-center", "gap-2");
			li.textContent = resume.name;
			li.addEventListener("click", async () => {
				const resumeName = document.getElementById("resumeName");

				if (resumeName) {
					resumeName.textContent = resume.name;
				}

				await resumeChanged(resume.location);
			});

			resumeList.appendChild(li);
		}
	}

	const dropdownLang = document.getElementById("dropdownLang");
	const langList = dropdownLang?.querySelector("ul");

	if (langList) {
		for (const lang of Object.keys(LANGUAGES)) {
			const li = document.createElement("li");

			li.classList.add("cursor-pointer", "block", "px-4", "py-1", "hover:font-bold", "flex", "items-center", "gap-2");
			li.textContent = LANGUAGES[lang].label;
			li.addEventListener("click", async () => {
				await langChanged(LANGUAGES[lang].code);
			});

			langList.appendChild(li);
		}
	}

	const dropdownPrimaryColor = document.getElementById("dropdownPrimaryColor");
	const primaryColorList = dropdownPrimaryColor?.querySelector("ul");

	if (primaryColorList) {
		for (const color of COLORS) {
			const li = document.createElement("li");

			li.classList.add("cursor-pointer", "block", "px-4", "py-1", "hover:font-bold", "flex", "items-center", "gap-2");
			li.innerHTML = `<div class="w-4 h-4 rounded-md bg-${color}-500"></div> ${color}`;
			li.addEventListener("click", () => primaryColorChanged(color));

			primaryColorList.appendChild(li);
		}
	}

	const dropdownSecondaryColor = document.getElementById("dropdownSecondaryColor");
	const secondaryColorList = dropdownSecondaryColor?.querySelector("ul");

	if (secondaryColorList) {
		for (const color of COLORS) {
			const li = document.createElement("li");

			li.classList.add("cursor-pointer", "block", "px-4", "py-1", "hover:font-bold", "flex", "items-center", "gap-2");
			li.innerHTML = `<div class="w-4 h-4 rounded-md bg-${color}-500"></div> ${color}`;
			li.addEventListener("click", () => secondaryColorChanged(color));

			secondaryColorList.appendChild(li);
		}
	}
});
