import { Resume } from "@universal-resume/ts-schema";
import { Effect, Schema } from "effect";
import { isFailure, isSuccess } from "effect/Exit";
import { formater } from "./renderer/formater.js";
import type { TemplateId } from "./template.js";
import { Template } from "./template.js";

export type Theme = {
	color: {
		primary: string;
		secondary: string;
	};
};

export type Config = {
	domElement: HTMLElement;
	theme?: Theme;
	template?: TemplateId;
};

export const DEFAULT_THEME: Theme = {
	color: { primary: "emerald", secondary: "yellow" },
};

export async function Renderer(json: object, config: Config) {
	const decode = Schema.decodeUnknown(Resume.Schema)({
		...json,
		meta: {},
	}).pipe(Effect.mapError(formater));

	const resume = await Effect.runPromiseExit(decode);

	if (isFailure(resume) && resume.cause._tag === "Fail") {
		throw new Error(`Malformed resume: ${resume.cause.error}`);
	}

	if (isSuccess(resume)) {
		config.domElement.innerHTML = "";
		await Template(config?.template).render(
			resume.value,
			config.domElement,
			config?.theme || DEFAULT_THEME,
		);
	}
}
