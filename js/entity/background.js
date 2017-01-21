define(['core/graphic', 'geo/v2', 'basic/entity'],
	function(g, V2, Entity) {
		var tiles = [
			'img/bg_kachel_1.png',
			'img/bg_kachel_2.png',
			'img/bg_kachel_3.png'
		];

		for(var i in tiles) g.add(tiles[i]);

		function Background(size) {
			Entity.call(this, Zero(), size);
			this.img = document.createElement('canvas');
			this.img.width = size.x;
			this.img.height = size.y;

			var ctx = this.img.getContext('2d');
			var t = new V2(g[tiles[0]].width, g[tiles[0]].height);
			for (var x = 0; x < size.x; x += t.x)
				for (var y = 0; y < size.y; y += t.y)
					ctx.drawImage(g[tiles[(Math.random() * tiles.length) | 0]], x, y);
		}

		Background.prototype = new Entity();

		Background.prototype.onDraw = function(ctx) {
			ctx.drawImage(this.img, 0, 0);
		};

		return Background;
	}
);
