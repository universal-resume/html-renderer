import { Theme } from "../../../renderer";
import { Date } from "./date";

export const TitleAndDate = ({ title, date, startDate, endDate }: { title: string, date?: string | undefined, startDate?: string | undefined, endDate?: string | undefined }, { color }: Theme): string => {
    return `
        <div class="flex justify-between text-sm">
            ${title}
            ${Date({ date, startDate, endDate }, { color })}
        </div>
    `
}