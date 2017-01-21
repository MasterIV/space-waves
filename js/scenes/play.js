define([
		'lib/scene',
		'geo/v2',
		'entity/uicontroller',
		'lib/isogrid',
		'entity/room',
		'lib/viewport',
		'entity/background',
		'entity/cursor',
		'entity/map',
		'entity/creature'
	], function (Scene, V2, UIController, IsoGrid, Room, Viewport, Bg, Cursor, Map, Creature) {
			function PlayScene() {
				Scene.call(this);
				this.viewport = new Viewport();
				this.viewport.position = this.size.quo(2);
				this.viewport.dragable(true, true);

				var grid = new IsoGrid(this.viewport, 64, 32);
				var map = new Map(grid);

				this.viewport.add(new Room(new V2(-1, -1), grid, rooms[0]));
				this.viewport.add(new Creature(new V2(0, 0), map, 1, units.alien ));
				this.viewport.add(new Cursor(grid, {at: function() {return true;}}, function(p) {console.log(p)}));


				this.add(new Bg(this.size));
				this.add(this.viewport);



				// this.room = new Room(Zero(), rooms[10].shape, grid);
				// this.add(this.room);
				this.gui = new UIController();
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
