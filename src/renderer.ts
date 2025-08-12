import { Resume } from "@universal-resume/ts-schema";
import { Effect, Schema } from "effect";
import { isFailure, isSuccess } from "effect/Exit";
import { formater } from "./renderer/formater";
import type { TemplateId } from "./template";
import { Template } from "./template";

export type Theme = {
	color: {
		primary: string;
		secondary: string;
	};
};

type Config = {
	domElement: string;
	theme: Theme;
	template: TemplateId;
};

const DEFAULT_THEME: Theme = {
	color: { primary: "emerald", secondary: "yellow" },
};

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
