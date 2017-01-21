define(['geo/v2', 'basic/entity', 'core/graphic', 'basic/image', 'core/mouse'],
	function (V2, Entity, g, ImageEntity, mouse) {
		g.add('img/room/tile_hover.png');

		function Cursor(grid, room, callback) {
			Entity.call(this, Zero());
			this.add(new ImageEntity(Zero(), 'img/room/tile_hover.png'));
			this.grid = grid;
			this.room = room;
			this.callback = callback;
		}

		Cursor.prototype = new Entity();

		Cursor.prototype.onUpdate = function() {
			if(this.room.at(this.grid.getIso(mouse)))
				this.position = this.grid.snap(mouse).dif(this.grid.size);
		};

		Cursor.prototype.onClick = function() {
			var to = this.grid.getIso(mouse);

			if(this.room.at(to))
				this.callback( to);
		};

		return Cursor;
	});