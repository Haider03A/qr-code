/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-export-outline': '&#xe905;',
		'icon-cloud_done': '&#xe903;',
		'icon-miscellaneous_services': '&#xe901;',
		'icon-home': '&#xe900;',
		'icon-arrow_drop_up': '&#xe906;',
		'icon-cloud-error': '&#xe904;',
		'icon-qrcode': '&#xe938;',
		'icon-wondering': '&#xe9fb;',
		'icon-info': '&#xea0c;',
		'icon-file-excel': '&#xeae2;',
		'icon-lock': '&#xf023;',
		'icon-edit': '&#xf044;',
		'icon-pencil-square-o': '&#xf044;',
		'icon-cloud-upload': '&#xf0ee;',
		'icon-keyboard-o': '&#xf11c;',
		'icon-file-code-o': '&#xe902;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
