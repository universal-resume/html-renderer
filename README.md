# html-renderer
Light Javascript tool that render your json universal-resume into a good looking PDF-Printable HTML page.

## Key features
- Only maintain you resume as a JSON.
- Section are not cut between pages. If a section content is to big, the whole section move to the next page.
- The print mode (be sure to select "No border" option) fit the preview so you PDF looks the same as HTML.

## How to use
1. Clone this repository and be sure to have NodeJS installed.
2. Replace the `resume.json` file content by your own resume data following the [universal-resume json-schema](https://github.com/universal-resume/json-schema/blob/main/schema.json), or if you prefere the [universal-resume effect-schema](https://github.com/universal-resume/ts-schema/blob/main/src/resume.ts)
3. Run `npm i && npm run serve` at the root folder of this repository
4. Open a browser tab on `http://localhost:5173`

## How to contribute
Feel free to propose fixes or adjustements, or even create another template.
To create a new template:
1. Update the `template.ts` file adding you new template (find a pretty name ;))
2. use the `chronology` template as boilerplate by duplicating the `chronology.ts` file and the `chronology` folder
3. Raise a pull request 