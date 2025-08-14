export const TitleHtmlElement = ({ title }: { title: string }): string => {
	return `
		<div class="flex items-center justify-center">
			${title}	
		</div>
    `;
};
