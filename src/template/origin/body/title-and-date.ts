import { DateHtmlElement } from "./date";

export const TitleAndDateHtmlElement = ({
	title,
	date,
	startDate,
	endDate,
}: {
	title: string;
	date?: string | undefined;
	startDate?: string | undefined;
	endDate?: string | undefined;
}): string => {
	return `
        <div class="flex justify-between text-sm">
            ${title}
            ${DateHtmlElement({ date, startDate, endDate })}
        </div>
    `;
};
