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
		}

		Cursor.prototype = new Entity();

		Cursor.prototype.onUpdate = function() {
			this.position = this.grid.snap(mouse).dif(this.grid.size);
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