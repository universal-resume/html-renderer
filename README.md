# html-renderer
Light Javascript tool that render your json universal-resume into a good looking PDF printable HTML page.

## Key features
- Only maintain you resume as a JSON.
- Section are not cut between pages. If a section content is to big, the whole section move to the next page.
- The print mode (be sure to select "No border") fit the preview so you PDF looks the same as HTML.

## How to use
1> Replace the `resume.json` file content by your own resume data following the [universal-resume](https://github.com/universal-resume/json-schema/blob/main/schema.json) schema.
2> Run `npm run serve` and open a browser tab on `http://localhost:5173`

## How to contribute
Feel free to propose fixes or adjustements, or even create another template.
To create a new template:
1> Update the `template.ts` file adding you new template (find a pretty name ;))
2> use the `origin` template as boilerplate by duplicating the `origin.ts` file and the `origin` folder
3> Raise a pull request 