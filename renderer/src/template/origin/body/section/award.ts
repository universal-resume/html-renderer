import { Award } from "@universal-resume/ts-schema";
import { Theme } from "../../../../../renderer";
import { Tags } from "../tags";
import { Summary } from "../summary";
import { Location } from "../location";
import { TitleAndDate } from "../title-and-date";
import { Layout } from "../layout";

export function AwardRenderer(
    { awarder, date, summary, location, tags, title }: Award.Type,
    { color }: Theme,
    index: number
) {

    return {
        build: () => {
            const content = `
                ${TitleAndDate({ title: `<span><strong>${title}</strong> from <strong>${awarder}</strong></span>`, date }, { color })}
                ${Location(location, { color })}
                ${Summary(summary, { color })}
                ${Tags(tags, { color })}
            `
            return Layout('award', index, content);
        }
    }
}