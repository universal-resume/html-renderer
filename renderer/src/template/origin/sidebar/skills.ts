export function Skills(skills: string[]) {

    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    const getColor = (skill: string) => {
        const tailwindColors = [
            "red",
            "orange",
            "amber",
            "yellow",
            "lime",
            "green",
            "emerald",
            "teal",
            "cyan",
            "sky",
            "blue",
            "indigo",
            "violet",
            "purple",
            "fuchsia",
            "pink",
            "rose",
        ];
        const hash = hashCode(skill);
        const index = Math.abs(hash % tailwindColors.length);
        return tailwindColors[index];
    }

    return {
        build: () => {
            const container = document.createElement('div');
            container.classList.add('text-center', 'py-4');
            for (const skill of skills) {
                const div = document.createElement('div');
                const color = getColor(skill);
                div.classList.add('m-1', 'text-xs', 'inline-flex', 'items-center', 'font-bold', 'leading-sm', 'uppercase', 'px-1.5', 'py-0.5', `bg-${color}-200`, `text-${color}-700`, 'rounded-full');
                div.textContent = skill;
                container.appendChild(div);
            }
            return container;
        }
    }
}

export default Skills;