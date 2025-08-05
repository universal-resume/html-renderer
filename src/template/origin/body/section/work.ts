import { Work } from "@universal-resume/ts-schema";
import { Theme } from "../../../../renderer";
import { TitleAndDate } from "../title-and-date";
import { Location } from "../location";
import { Link } from "../link";
import { Summary } from "../summary";
import { Highlights } from "../highlights";
import { Tags } from "../tags";
import { Layout } from "../layout";

export function WorkRenderer(
    { position, contractType, organization, location, startDate, endDate, description, highlights, url, tags }: Work.Type,
    { color }: Theme,
    index: number
) {

    return {
        build: () => {
            const title = `<span><strong>${position}</strong> at <strong>${organization}</strong></span>`
            const content = `
                ${TitleAndDate({ title , startDate, endDate}, { color })}
                ${Location(location, { color })}
                ${Link(url, { color })}
                ${Summary(description, { color })}
                ${Highlights(highlights, { color })}
                ${Tags(tags, { color })}
            `
            return Layout('work', index, content);
        }
    }
}