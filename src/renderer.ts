import { Effect, Schema } from "effect";
import { Resume } from "@universal-resume/ts-schema";
import { isFailure, isSuccess } from "effect/Exit";
import { Template, TEMPLATES } from "./template";
import type { TemplateId } from "./template";
import { formater } from "./renderer/formater";

export type Theme = {
	color: string;
};

type Config = {
	domElement: string;
	theme: Theme;
	template: TemplateId;
};

const DEFAULT_THEME: Theme = { color: "blue" };

export async function Renderer(json: object, config?: Config) {
	const decode = Schema.decodeUnknown(Resume.Schema)({
		...json,
		meta: {},
	}).pipe(Effect.mapError(formater));

	const resume = await Effect.runPromiseExit(decode);

	if (isFailure(resume) && resume.cause._tag === "Fail") {
		throw new Error(`Malformed resume: ${resume.cause.error}`);
	}

	const domElement = document.getElementById(config?.domElement || "resume");

	if (!domElement) {
		throw new Error(`DOM element "${config?.domElement}" not found`);
	}

	if (isSuccess(resume)) {
		domElement.innerHTML = "";
		Template(config?.template).render(
			resume.value,
			domElement,
			config?.theme || DEFAULT_THEME,
		);
	}
}
