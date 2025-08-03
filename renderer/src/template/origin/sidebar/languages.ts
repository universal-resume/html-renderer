type LanguagesArgs = Array<{
    language: string;
    fluency?: string | undefined;
}>

const addFlagIcons = () => {
    const flagIconsLink = document.getElementById('flag-icons')
    if (!flagIconsLink) {
        const flagIconsLink = document.createElement('link');
        flagIconsLink.id = 'flag-icons';
        flagIconsLink.rel = 'stylesheet';
        flagIconsLink.href = 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/css/flag-icons.min.css';
        document.head.appendChild(flagIconsLink);
    }
}

function Languages(languages: LanguagesArgs) {

    const flagsMapping = {
        'English': 'gb',
        'French': 'fr',
        'Spanish': 'es',
        'German': 'de',
        'Italian': 'it',
        'Portuguese': 'pt',
        'Russian': 'ru',
        'Chinese': 'cn',
        'Japanese': 'jp',
        'Korean': 'kr',
        'Arabic': 'ae',
        'Hebrew': 'il',
        'Turkish': 'tr',
        'Dutch': 'nl',
    }

    return {
        build: () => {
            addFlagIcons();
            const ul = document.createElement('ul');
            ul.classList.add('py-4', 'flex', 'flex-col', 'gap-3');
            for (const language of languages) {
                const li = document.createElement('li');
                li.classList.add('text-white', 'flex', 'flex-col');
                const languageDiv = document.createElement('span');
                languageDiv.classList.add('text-sm', 'font-bold', 'flex', 'items-center', 'gap-1', 'justify-center');

                if (flagsMapping[language.language]) {
                    const flag = document.createElement('span');
                    flag.classList.add('fi', `fi-${flagsMapping[language.language]}`, 'fis', 'text-xs');
                    languageDiv.appendChild(flag);
                }
                languageDiv.appendChild(document.createTextNode(language.language));
                li.appendChild(languageDiv);
                if (language.fluency) {
                    const fluency = document.createElement('span');
                    fluency.classList.add('text-xs', 'text-white', 'text-center');
                    fluency.textContent = language.fluency;
                    li.appendChild(fluency);
                }
                ul.appendChild(li);
            }
            return ul;
        }
    }
}

export default Languages;