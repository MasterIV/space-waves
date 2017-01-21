define(['definition/font'], function(FontStyle) {
	var left = new FontStyle(40, '#FFF', 'sans-serif', '#555' );
	left.align = 'left';
	left.base = 'top';

	return {
		default: new FontStyle(40, '#FFF', 'sans-serif', '#555' ),
		left: left,
		frames: new FontStyle(12, '#FFF', 'monospace' )
	};
});
