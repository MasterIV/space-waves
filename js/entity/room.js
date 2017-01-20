define(['geo/v2', 'core/graphic', 'basic/entity'],
	function (V2, g, Entity) {
		g.add('img/room/wall_rp.png');
		g.add('img/room/wall_r.png');
		g.add('img/room/wall_lp.png');
		g.add('img/room/wall_l.png');
		g.add('img/room/tile.png');

		function Room(pos, shape, grid) {
			var size = new V2(shape.length, shape[0].length);
			Entity.call(this, pos, new V2((size.x + size.y) * grid.size.x + grid.size.x , (size.x + size.y) * grid.size.y + 400));

			var canvas = document.createElement('canvas');
			canvas.width = this.size.x;
			canvas.height = this.size.y;

			var offset = new V2(size.x * grid.size.x - grid.size.y, grid.size.y*10 );
			var ctx = canvas.getContext('2d');
			var wall;

			for (var x = 0; x < size.x; x++)
				for (var y = 0; y < size.y; y++)
					if (shape[x][y]) {
						var p = offset.sum(grid.getPixels(new V2(x,y)));

						if (x == 0 || !shape[x - 1][y]) {
							wall = true;

							for (var i = x - 2; i > -1; i--)
								if (shape[i][y]) wall = false;

							if (wall)
								if (y == size.y - 1 || !shape[x][y + 1] || y == 0 || !shape[x][y - 1])
									ctx.drawImage(g['img/room/wall_rp.png'], p.x + grid.size.x, p.y - 246, 82, 294);
								else
									ctx.drawImage(g['img/room/wall_r.png'], p.x + grid.size.x, p.y - 246, 82, 294);
						}

						if (y == 0 || !shape[x][y - 1]) {
							wall = true;

							for (var i = y - 2; i > -1; i--)
								if (shape[x][i]) wall = false;

							if (wall)
								if (x == size.x - 1 || !shape[x + 1][y] || x == 0 || !shape[x - 1][y])
									ctx.drawImage(g['img/room/wall_lp.png'], p.x - 16, p.y - 246, 82, 294);
								else
									ctx.drawImage(g['img/room/wall_l.png'], p.x - 16, p.y - 246, 82, 294);
						}

						ctx.drawImage(g['img/room/tile.png'], p.x, p.y, 130, 80);
					}

			this.draw = function (ctx) {
				ctx.drawImage(canvas, this.position.x, this.position.y, canvas.width, canvas.height);
			};

			this.getOffset = function () {
				return offset;
			};

			this.at = function(p) {
				p = p.dif(new V2(-1, 12));
				if(p.x < 0 || p.x >= size.x) return false;
				if(p.y < 0 || p.y >= size.y) return false;
				return shape[p.x][p.y];
			}
		}

		Room.prototype = new Entity();

		return Room;
	});