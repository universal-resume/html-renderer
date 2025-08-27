import type { Basics, Language, Skill } from "@universal-resume/ts-schema";
import type { Lang, Theme } from "../../../renderer.js";

const logos = {
	linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16" width="16" fill="#FFF"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>`,
	github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" height="16" width="16" fill="#FFF"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>`,
	x: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="16" width="16" fill="#FFF"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>`,
	twitter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="16" width="16" fill="#FFF"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"/></svg>`,
	instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height="16" width="16" fill="#FFF"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z"/></svg>`,
};
const flagsMapping: Record<string, string> = {
	English: "gb",
	French: "fr",
	Spanish: "es",
	German: "de",
	Italian: "it",
	Portuguese: "pt",
	Russian: "ru",
	Chinese: "cn",
	Japanese: "jp",
	Korean: "kr",
	Arabic: "ae",
	Hebrew: "il",
	Turkish: "tr",
	Dutch: "nl",
};

const i18n = {
	en: {
		available: "Available",
	},
	fr: {
		available: "Disponible",
	},
} as const;

export function HeaderHtmlElement(
	{ basics, skills }: { basics: Basics.Type; skills: Skill.Type[] },
	theme: Theme,
	lang: Lang,
) {
	const generateAvatarFromName = (name: string) => {
		const initials = name
			.split(" ")
			.map((word) => word[0])
			.join("");
		return `
            <div class="w-28 h-28 rounded-full border-4 border-${theme.color.secondary}-600 flex justify-center items-center bg-${theme.color.primary}-500">
                <span class="text-5xl text-white tracking-widest">${initials}</span>
            </div>
        `;
	};

	const addFlagIcons = () => {
		const flagIconsLink = document.getElementById("flag-icons");
		if (!flagIconsLink) {
			const flagIconsLink = document.createElement("link");
			flagIconsLink.id = "flag-icons";
			flagIconsLink.rel = "stylesheet";
			flagIconsLink.href =
				"https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/css/flag-icons.min.css";
			document.head.appendChild(flagIconsLink);
		}
	};

	return {
		build: ({ id }: { id: string }) => {
			addFlagIcons();
			const domElement = document.createElement("div");
			domElement.id = id;
			domElement.classList.add("section", "flex", "py-4", "relative");
			domElement.innerHTML = `
                <div class="w-1/4">
                    <div class="flex items-center justify-center">
                        ${
													basics.picture
														? `
                            <img src="${basics.picture}" alt="${basics.name} profile picture" class="w-28 h-28 rounded-full border-4 border-${theme.color.primary}-200">
                        `
														: generateAvatarFromName(basics.name)
												}
                    </div>
					<div class="px-4">
                    <table class="text-white mx-auto mt-4 text-sm">
                        ${
													basics.location?.city
														? `
                            <tr>
                                <td class="pr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z"/></svg>
                                </td>
                                <td>
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/search?q=${basics.location.city}" class="hover:underline">${basics.location.city}</a>
                                </td>
                            </tr>
                        `
														: ""
												}
                        ${basics.profiles
													?.map(
														(profile) => `
                            <tr>
                                <td class="pr-2">
                                    ${logos[profile.network.toLowerCase() as keyof typeof logos] || ""}
                                </td>
                                <td>
                                    <a href="${profile.url}" rel="noopener noreferrer" target="_blank" class="hover:underline">${profile.username || profile.url}</a>
                                </td>
                            </tr>
                        `,
													)
													.join("")}
                        ${([] as Language.Type[])
													.map(
														(language) => `
                            <tr>
                                <td class="pr-2">
                                    <span class="fi fi-${language.countryCode ? language.countryCode.toLowerCase() : flagsMapping[language.name]} fi text-xs"></span>
                                </td>
                                <td>
                                    ${language.fluency || language.name}
                                </td>
                            </tr>
                        `,
													)
													.join("")}
                        </table>
					</div>
                        ${
													basics.contact?.email || basics.contact?.phone
														? `
                            <div class="flex items-center justify-center text-${theme.color.primary}-700 text-center break-all flex-col gap-2 p-4 font-bold bg-${theme.color.primary}-200 mt-4">
                                ${
																	basics.contact?.email
																		? `
                                    <a href="mailto:${basics.contact.email}" class="text-sm flex items-center justify-center hover:underline">${basics.contact.email}</a>
                                `
																		: ""
																}
                                ${
																	basics.contact?.phone
																		? `
                                    <a href="tel:${basics.contact.phone}" class="text-sm flex items-center justify-center hover:underline">${basics.contact.phone}</a>
                                `
																		: ""
																}
                            </div>
                        `
														: ""
												}
                </div>
                <div class="w-3/4 flex flex-col justify-between">
                    <div class="grid justify-items-end px-4">
                        <div class="w-full flex justify-between">
							${
								basics.availability
									? `
							<div class="m-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-1.5 py-0.5 bg-${theme.color.secondary}-200 text-${theme.color.secondary}-700 rounded-full"> ${i18n[lang].available} ${basics.availability}</div>
							`
									: `<div></div>`
							}
                        	<h1 class="text-2xl font-extrabold">${basics.name}</h1>
						</div>
                        <p class="text-lg mt-1">${basics.headline}</p>
                        ${basics.website ? `<p class="text-sm mt-1"><a href="${basics.website}" class="text-${theme.color.primary}-600">${basics.website}</a></p>` : ""}
                    </div>
                    ${basics.summary ? `<p class="text-xs font-semibold p-4 mx-4 italic border border-${theme.color.primary}-500 border-2 rounded-xl text-justify">${basics.summary}</p>` : ""}
                    ${
											skills?.length > 0
												? `
                        <div class="text-center">
                                ${skills
																	.flatMap((skill) => skill.tags)
																	.map(
																		(skill) =>
																			`<div class="m-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-1.5 py-0.5 bg-${theme.color.primary}-200 text-${theme.color.primary}-700 rounded-full">${skill}</div>`,
																	)
																	.join("")}
                        </div>
                    `
												: ""
										}
                    </div>
                </div>
            `;
			return domElement;
		},
	};
}
