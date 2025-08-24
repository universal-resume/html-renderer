import { Resume } from "@universal-resume/ts-schema";
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
	const resume = Resume.decodeSync(
		{
			...json,
			meta: {},
		},
		{ errors: "all", exact: true },
	);

	await Template(config?.template).render(
		resume,
		config.domElement,
		config?.theme ?? DEFAULT_THEME,
	);
}
