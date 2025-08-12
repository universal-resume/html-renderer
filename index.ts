import { Renderer } from "./src/renderer";

window.addEventListener("load", async () => {
	const resume = await fetch("./resume.json");
	const resumeJson = await resume.json();

	Renderer(resumeJson, {
		template: "chronology",
		theme: {
			color: {
				primary: "indigo",
				secondary: "rose",
			},
		},
		domElement: "resume",
	}).catch((e) => {
		console.error(e);
	});
});
