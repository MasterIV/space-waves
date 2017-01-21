define(['geo/v2', 'basic/entity', 'core/graphic', 'basic/image', 'core/mouse'],
	function (V2, Entity, g, ImageEntity, mouse) {
		g.add('img/room/tile_hover.png');

		function Cursor(grid, map) {
			Entity.call(this, Zero());
			this.add(new ImageEntity(Zero(), 'img/room/tile_hover.png'));
			this.grid = grid;
			this.map = map;

			this.room = null;
			this.unit = null;
			this.z = 0;
			this.pos = new V2(0,0);
		}

		Cursor.prototype = new Entity();

		Cursor.prototype.onUpdate = function() {
			this.pos = this.grid.getIso(mouse);
			this.position = this.grid.getPixels(this.pos).dif(this.grid.size);

			var room = this.map.get(this.pos.x, this.pos.y);
			this.z = room ? room.z + 2 : -1e20;
		};

		Cursor.prototype.onClick = function() {
			var to = this.grid.getIso(mouse);
			var unit;

			if(this.room && this.map.addRoom(to, this.room, false))
				this.room = null;
			else if(unit = this.map.unit(to))
				this.unit = unit;
			else if(this.unit)
				this.unit.move(to);
		};

		return Cursor;
	});