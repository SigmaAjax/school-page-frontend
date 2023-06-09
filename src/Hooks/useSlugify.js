export default function useSlugify() {
	function slugify(text) {
		text = text.replace(/^\s+|\s+$/g, ''); // trim
		text = text.toLowerCase();

		// get rid of diacritics, swap ň for n .........
		var from = 'àáäâèéěêìíïîòóöôùúüûňčšžýř·/_,:;';
		var to = 'aaaaeeeeiiiioooouuuuncszyr------';
		for (var i = 0, l = from.length; i < l; i++) {
			text = text.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
		}

		text = text
			.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
			.replace(/\s+/g, '-') // collapse whitespace and replace by -
			.replace(/-+/g, '-'); // collapse dashes

		//console.log(text);

		return text;
	}

	return {slugify};
}
