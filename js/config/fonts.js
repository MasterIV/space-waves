define(['definition/font'], function(FontStyle) {
	function leftFont(size, color, type, hover) {
		var f = new FontStyle(size, color, type, hover);
		f.align = 'left';
		f.base = 'top';
		return f;
	}

	return {
		default: new FontStyle(40, '#FFF', 'sans-serif', '#555' ),
		left: leftFont(40, '#FFF', 'sans-serif', '#555' ),
		roomTitle: leftFont(12, '#FFF', 'monospace' ),
		frames: new FontStyle(12, '#FFF', 'monospace' )
	};
});
