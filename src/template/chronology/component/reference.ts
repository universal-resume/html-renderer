export function ReferenceHtmlElement({
	name,
	testimonial,
	position,
	organization,
}: {
	name: string;
	testimonial?: string;
	position?: string;
	organization?: { name: string };
}) {
	if (!testimonial) return "";
	return `<div class="flex flex-col gap-1 py-4 px-2 items-center">
				<div class="text-xs italic text-center w-full">“${testimonial}”</div>
				<div class="text-xs text-center w-full pt-2"><span class="font-bold">${name}</span> ${position ? `, ${position}` : ""} ${organization ? ` at ${organization.name}` : ""}</div>
			</div>`;
}
