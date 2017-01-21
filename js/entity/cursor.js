define(['geo/v2', 'basic/entity', 'core/graphic', 'basic/image', 'core/mouse', 'lib/pathfinder'],
	function (V2, Entity, g, ImageEntity, mouse, Pathfinder) {
		g.add('img/room/tile_hover.png');

		function Cursor(grid, map) {
			Entity.call(this, Zero());
			this.add(new ImageEntity(Zero(), 'img/room/tile_hover.png'));
			this.grid = grid;
			this.map = map;

			this.room = null;
			this.unit = null;
			this.pathfinder = new Pathfinder(map);
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

			if(this.room && this.map.addRoom(to, this.room, false)) {
				this.room = null;
			} else if(unit = this.map.unit(to)) {
				if(this.unit) this.unit.unselect();
				this.unit = unit;
				this.unit.select();
			} else if(this.unit) {
				var room = this.map.get(to.x, to.y);
				if(!room || room.get(to.x, to.y) > 1) return;
				if(this.map.unit(to.x, to.y)) return;
				this.unit.move(this.pathfinder.find(this.unit.pos, to));
			}
		};

		return Cursor;
	});