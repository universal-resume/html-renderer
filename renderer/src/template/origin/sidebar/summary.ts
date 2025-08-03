type SummaryArgs = {
    text: string;
}

function Summary({ text }: SummaryArgs) {

    return {
        build: () => {
            const p = document.createElement('p');
            p.textContent = text;
            p.classList.add('text-xs', `text-white`, 'text-center', 'py-4', 'font-bold', 'leading-5');
            return p;
        }
    }
}

export default Summary;