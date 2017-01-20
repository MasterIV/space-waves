define(['geo/v2'],
	function (V2) {
		function IsoGrid( container, w, h ) {
			this.getIso = function( abs ) {
				var pos = abs.dif(container.position);
				return new V2(
					Math.round((pos.y / h - pos.x / w) / 2 ) | 0,
					Math.round((pos.x / w + pos.y / h) / 2 ) | 0
				);
			};

			this.getPixels = function( pos ) {
				return new V2(
					(pos.y - pos.x ) * w,
					(pos.y + pos.x) * h
				);
			};

			this.snap = function(pos) {
				return this.getPixels(this.getIso(pos));
			};

			this.size = new V2(w, h);
		}

		return IsoGrid;
	});