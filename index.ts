import { Renderer } from "./src/renderer";
import { TemplateId } from "./src/template";

const RESUMES = ["bill-palmer", "dwight-schrute", "harry-potter"];
const COLORS = ["red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose", "slate", "gray", "zinc", "stone"];

window.addEventListener("load", async () => {
	const custom = await fetch("./resume.json");
	const customJson = await custom.json();

	let json = customJson;
	let template: TemplateId = "chronology" as const;
	let primaryColor = "indigo";
	let secondaryColor = "rose";

	const resumeChanged = async (resume: string) => {
			json = customJson;
			if (resume !== "custom") {
				json = await fetch(`https://unpkg.com/@universal-resume/json-examples@0.1.1/examples/${resume}.json`)
					.then((res) => res.json())
			}
			render();
	}

	const primaryColorChanged = (color: string) => {
		const button = document.getElementById("dropdownButtonPrimaryColor");
		if (button) {
			button.classList.remove(`text-${primaryColor}-700`, `bg-${primaryColor}-200`, `hover:bg-${primaryColor}-300`);
			button.classList.add(`text-${color}-700`, `bg-${color}-200`, `hover:bg-${color}-300`);
		}
		primaryColor = color;
		render();
	}

	const secondaryColorChanged = (color: string) => {
		const button = document.getElementById("dropdownButtonSecondaryColor");
		if (button) {
			button.classList.remove(`text-${secondaryColor}-700`, `bg-${secondaryColor}-200`, `hover:bg-${secondaryColor}-300`);
			button.classList.add(`text-${color}-700`, `bg-${color}-200`, `hover:bg-${color}-300`);
		}
		secondaryColor = color;
		render();
	}

	const render = () => {
		const domElement = document.getElementById("resume");
		if (!domElement) {
			throw new Error("DOM element \"resume\" not found");
		}
		Renderer(json, {
			template,
			theme: {
				color: {
					primary: primaryColor,
						secondary: secondaryColor,
					},
				},
				domElement,
			}).catch((e) => {
				console.error(e);
			});
	}

	render();

	const dropdownResume = document.getElementById("dropdownResume");
	const resumeList = dropdownResume?.querySelector("ul");
	if (resumeList) {
		for (const resume of RESUMES) {
			const li = document.createElement("li");
			li.classList.add("cursor-pointer", "block", "px-4", "py-1", "hover:font-bold", "flex", "items-center", "gap-2");
			li.innerHTML = `${resume}`;
			li.addEventListener("click", () => {
				resumeChanged(resume);
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
			li.addEventListener("click", () => {
				primaryColorChanged(color)
			});
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
			li.addEventListener("click", () => {
				secondaryColorChanged(color)
			});
			secondaryColorList.appendChild(li);
		}
	}

});
