import { examples } from "@universal-resume/json-examples";
import { Renderer } from "./src/renderer";
import { TemplateId } from "./src/template";

const COLORS = ["red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose", "slate", "gray", "zinc", "stone"];

const resumes = [{ name: "Custom", location: "./resume.json" }, ...examples];

window.addEventListener("load", async () => {
	let json = await fetch("./resume.json").then((res) => res.json());
	let template: TemplateId = "chronology" as const;
	let primaryColor = "indigo";
	let secondaryColor = "rose";

	const resumeChanged = async (location: string) => {
		json = await fetch(location)
			.then((res) => res.json());

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

		if (!domElement) {
			throw new Error("DOM element with ID \"resume\" not found")
		}

		if (domElement.innerHTML) {
			domElement.innerHTML = "";
		}

		await Renderer(json, {
			template,
			theme: {
				color: {
					primary: primaryColor,
					secondary: secondaryColor,
				},
			},
			domElement,
		});
	}

	await render();

	const dropdownResume = document.getElementById("dropdownResume");
	const resumeList = dropdownResume?.querySelector("ul");

	if (resumeList) {
		for (const resume of resumes) {
			const li = document.createElement("li");

			li.classList.add("cursor-pointer", "block", "px-4", "py-1", "hover:font-bold", "flex", "items-center", "gap-2");
			li.innerHTML = `${resume.name}`;
			li.addEventListener("click", async () => {
				const resumeName = document.getElementById("resumeName");

				if (resumeName) {
					resumeName.innerHTML = resume.name;
				}

				await resumeChanged(resume.location);
			});

			resumeList.appendChild(li);
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
