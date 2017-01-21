define([
		'lib/scene',
		'geo/v2',
		'entity/uicontroller',
		'lib/isogrid',
		'lib/viewport',
		'entity/background',
		'entity/cursor',
		'entity/map',
		'entity/creature',
		'entity/ship'
	], function (Scene, V2, UIController, IsoGrid, Viewport, Bg, Cursor, Map, Creature, Ship) {
			function PlayScene() {
				Scene.call(this);
				this.viewport = new Viewport();
				this.viewport.position = this.size.quo(2);
				this.viewport.dragable(true, true);

				var grid = new IsoGrid(this.viewport, 64, 32);
				var map = new Map(grid);

				this.cursor = new Cursor(grid, map);
				this.gui = new UIController(this);

				map.addRoom(new V2(-1, -1), rooms[0], true);
				map.add(this.cursor);
				map.add(new Creature(new V2(0, 0), map, 1, units.alien ));

				this.viewport.add(Ship.spawn(map, 1, 30));
				this.viewport.add(Ship.spawn(map, 1, 30));
				this.viewport.add(Ship.spawn(map, 1, 30));
				this.viewport.add(Ship.spawn(map, 1, 30));
				this.viewport.add(Ship.spawn(map, 1, 30));
				this.viewport.add(Ship.spawn(map, 1, 30));


				this.viewport.add(map);
				this.add(new Bg(this.size));
				this.add(this.viewport);
				this.add(this.gui);

			}

			PlayScene.prototype = new Scene();

			// PlayScene.prototype.update = function (delta) {
			// 	this.display = document.getElementById('gameframe');
			// 	this.display.width = this.room.size.x;
			// 	this.display.height = this.room.size.y;
			// };

			PlayScene.prototype.Pause = function () {

			};

			return PlayScene;
		}
);
