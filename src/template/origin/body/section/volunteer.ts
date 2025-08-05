import { Volunteer } from "@universal-resume/ts-schema";
import { Theme } from "../../../../renderer";
import { TitleAndDate } from "../title-and-date";
import { Location } from "../location";
import { Summary } from "../summary";
import { Highlights } from "../highlights";
import { Tags } from "../tags";
import { Layout } from "../layout";

export function VolunteerRenderer(
    { organization, position, startDate, endDate, summary, highlights, tags, location }: Volunteer.Type,
    { color }: Theme,
    index: number
) {

    return {
        build: () => {
            const title = `<span><strong>${organization}</strong> as <strong>${position}</strong></span>`
            const content = `
                ${TitleAndDate({ title , startDate, endDate}, { color })}
                ${Location(location, { color })}
                ${Summary(summary, { color })}
                ${Highlights(highlights, { color })}
                ${Tags(tags, { color })}
            `
            return Layout('volunteer', index, content);
        }
    }
}