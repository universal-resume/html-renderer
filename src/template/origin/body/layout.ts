export const SectionLayout = (
	section: string,
	index: number,
	content: string,
) => `
    <div class="${section} flex flex-col gap-1 relative" id="${section}-${index}">
        ${content}
    </div>
`;
