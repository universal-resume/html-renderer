import { Renderer } from "./src/renderer";

window.addEventListener('load', async () => {
    const resume = await fetch('./resume.json');
    const resumeJson = await resume.json();

    Renderer(resumeJson, {
        template: 'origin',
        theme: {
            color: 'blue'
        },
        domElement: 'resume'
    }).catch(e => {
        console.error(e)
    });
});